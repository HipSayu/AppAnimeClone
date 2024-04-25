using ApiBasic.ApplicationServices.LoginModule.Abstract;
using ApiBasic.ApplicationServices.LoginModule.Dtos;
using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Constant;
using ApiBasic.Shared.Exceptions;
using ApiBasic.Shared.Utils;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ApiControllerBase
    {
        private readonly ILoginServices _loginServices;
        private readonly AppSetting _appSetting;
        private readonly AnimeAppContext _dbContext;

        public LoginController(
            ILoginServices loginServices,
            ILogger<LoginController> logger,
            IOptionsMonitor<AppSetting> optionsMonitor,
            AnimeAppContext dbContext
        )
            : base(logger)
        {
            _loginServices = loginServices;
            _dbContext = dbContext;
            _appSetting = optionsMonitor.CurrentValue;
        }

        [HttpGet("CheckSDT/{SDT}")]
        public IActionResult CheckSDT(string SDT)
        {
            try
            {
                return Ok(_loginServices.CheckSoDienThoai(SDT));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("Login")]
        public IActionResult Login([FromQuery] LoginDto input)
        {
            try
            {
                return Ok(_loginServices.Login(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("Logout")]
        public IActionResult Logout([FromQuery] LogoutDto input)
        {
            try
            {
                return Ok(_loginServices.Logout(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("Login_token")]
        public async Task<ActionResult> LoginToken([FromQuery] LoginDto input)
        {
            try
            {
                return Ok(_loginServices.LoginToken(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPost("Login_Save_Token")]
        public async Task<ActionResult> Login_Save_Token(LoginDto input)
        {
            var users = _dbContext
                .Users.Include(u => u.Followers)
                .ThenInclude(u => u.Following)
                .ThenInclude(u => u.Videos)
                .Where(u =>
                    u.SĐT.Equals(input.NumberPhone)
                    && u.UserName.Equals(input.UserName)
                    && u.Password.Equals(CommonUtils.CreateMD5(input.Password))
                )
                .Select(e => new FindUserDto
                {
                    Id = e.Id,
                    UserName = e.UserName,
                    AvatarUrl = e.AvatarUrl,
                    BackgroundUrl = e.BackgroundUrl,
                    SĐT = e.SĐT,
                    TieuSu = e.TieuSu,
                    Follower = e.Following.Count(),
                    Following = e.Followers.Count(),
                    Videos = e.Videos.Count(),
                });

            var result =
                users.FirstOrDefault() ?? throw new UserFriendlyExceptions("User không tìm thấy");
            var tokenData = await GenerationToken(result);

            return Ok(
                new LoginTokenDto
                {
                    Id = result.Id,
                    UserName = result.UserName,
                    AvatarUrl = result.AvatarUrl,
                    BackgroundUrl = result.BackgroundUrl,
                    SĐT = result.SĐT,
                    TieuSu = result.TieuSu,
                    Follower = result.Follower,
                    Following = result.Following,
                    Videos = result.Videos,
                    token = tokenData,
                }
            );
        }

        [HttpPost("refresh_token")]
        public async Task<ActionResult> ReNewToken(AccountToken model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSetting.SecretKey);
            var tokenValidateParam = new TokenValidationParameters
            {
                //tự cấp token
                ValidateIssuer = false,
                ValidateAudience = false,

                //ký vào token
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),

                ClockSkew = TimeSpan.Zero,

                ValidateLifetime = false //ko kiểm tra token hết hạn
            };
            try
            {
                //check 1: AccessToken valid format
                var tokenInVerification = jwtTokenHandler.ValidateToken(
                    model.AccessToken,
                    tokenValidateParam,
                    out var validatedToken
                );

                //check 2: Check alg
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(
                        SecurityAlgorithms.HmacSha512,
                        StringComparison.InvariantCultureIgnoreCase
                    );
                    if (!result) //false
                    {
                        return Ok(new ApiResponse { Success = false, Message = "Invalid token" });
                    }
                }

                //check 3: Check accessToken expire?
                var utcExpireDate = long.Parse(
                    tokenInVerification
                        .Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp)
                        .Value
                );

                var expireDate = ConvertUnixTimeToDateTime(utcExpireDate);
                if (expireDate > DateTime.UtcNow)
                {
                    return Ok(
                        new ApiResponse
                        {
                            Success = false,
                            Message = "Access token has not yet expired"
                        }
                    );
                }

                //check 4: Check refreshtoken exist in DB
                var storedToken = _dbContext.UserToken.FirstOrDefault(x =>
                    x.Token == model.RefreshToken
                );
                if (storedToken == null)
                {
                    return Ok(
                        new ApiResponse
                        {
                            Success = false,
                            Message = "Refresh token does not exist"
                        }
                    );
                }

                //check 5: check refreshToken is used/revoked?
                if (storedToken.IsUsed)
                {
                    return Ok(
                        new ApiResponse { Success = false, Message = "Refresh token has been used" }
                    );
                }
                if (storedToken.IsRevoked)
                {
                    return Ok(
                        new ApiResponse
                        {
                            Success = false,
                            Message = "Refresh token has been revoked"
                        }
                    );
                }

                //check 6: AccessToken id == JwtId in RefreshToken
                var jti = tokenInVerification
                    .Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)
                    .Value;
                if (storedToken.JwtId != jti)
                {
                    return Ok(new ApiResponse { Success = false, Message = "Token doesn't match" });
                }

                //Update token is used
                storedToken.IsRevoked = true;
                storedToken.IsUsed = true;
                _dbContext.Update(storedToken);
                await _dbContext.SaveChangesAsync();

                //create new token
                var user = await _dbContext.Users.SingleOrDefaultAsync(nd =>
                    nd.Id == storedToken.idUser
                );

                var token = await GenerationTokenUser(user);

                return Ok(
                    new ApiResponse
                    {
                        Success = true,
                        Message = "Renew token success",
                        Data = token
                    }
                );
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new ApiResponse { Success = false, Message = "Something went wrong" }
                );
            }
        }

        private async Task<AccountToken> GenerationToken(FindUserDto input)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSetting.SecretKey);
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Name, input.UserName),
                        new Claim(JwtRegisteredClaimNames.Sub, input.SĐT),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim("UserName", input.UserName),
                        new Claim("PhoneNumber", input.SĐT),
                        new Claim("Id", input.Id.ToString()),
                        //Roles
                    }
                ),
                Expires = DateTime.UtcNow.AddSeconds(30000),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(secretKeyBytes),
                    SecurityAlgorithms.HmacSha512Signature
                )
            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);
            var accessToken = jwtTokenHandler.WriteToken(token);
            var refreshToken = GenerationRefreshToken();

            //Save to DataBase

            var refreshTokenEntity = new UserToken
            {
                JwtId = token.Id,
                idUser = input.Id,
                Token = refreshToken,
                IsUsed = false,
                IsRevoked = false,
                IssuedAt = DateTime.UtcNow,
                ExpiredAt = DateTime.UtcNow.AddHours(1),
            };
            await _dbContext.AddAsync(refreshTokenEntity);
            await _dbContext.SaveChangesAsync();
            return new AccountToken { AccessToken = accessToken, RefreshToken = refreshToken, };
        }

        private async Task<AccountToken> GenerationTokenUser(User input)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSetting.SecretKey);
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Name, input.UserName),
                        new Claim(JwtRegisteredClaimNames.Sub, input.SĐT),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim("UserName", input.UserName),
                        new Claim("PhoneNumber", input.SĐT),
                        new Claim("Id", input.Id.ToString()),
                        //Roles
                    }
                ),
                Expires = DateTime.UtcNow.AddSeconds(30000),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(secretKeyBytes),
                    SecurityAlgorithms.HmacSha512Signature
                )
            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);
            var accessToken = jwtTokenHandler.WriteToken(token);
            var refreshToken = GenerationRefreshToken();

            //Save to DataBase

            var refreshTokenEntity = new UserToken
            {
                JwtId = token.Id,
                idUser = input.Id,
                Token = refreshToken,
                IsUsed = false,
                IsRevoked = false,
                IssuedAt = DateTime.UtcNow,
                ExpiredAt = DateTime.UtcNow.AddHours(1),
            };
            await _dbContext.AddAsync(refreshTokenEntity);
            await _dbContext.SaveChangesAsync();
            return new AccountToken { AccessToken = accessToken, RefreshToken = refreshToken, };
        }

        private string GenerationRefreshToken()
        {
            var random = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random);

                return Convert.ToBase64String(random);
            }
        }

        private DateTime ConvertUnixTimeToDateTime(long utcExpireDate)
        {
            var dateTimeInterval = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTimeInterval.AddSeconds(utcExpireDate).ToLocalTime();

            return dateTimeInterval;
        }
    }
}
