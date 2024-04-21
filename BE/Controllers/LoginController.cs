using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ApiBasic.ApplicationServices.LoginModule.Abstract;
using ApiBasic.ApplicationServices.LoginModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Constant;
using ApiBasic.Shared.Utils;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

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
        [HttpGet("Login_token")]
        public async Task<ActionResult> LoginToken([FromQuery]LoginDto input)
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

        private async Task<AccountToken> GenerationToken(User input)
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
                        new Claim("Id", input.Password.ToString()),
                        //Roles
                    }
                ),
                Expires = DateTime.UtcNow.AddSeconds(30),
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

                ValidateLifetime = false // khong kiem tra token het han
            };
            try
            {
                //check 1 : AccesToken valid format
                var tokenInVertification = jwtTokenHandler.ValidateToken(
                    model.AccessToken,
                    tokenValidateParam,
                    out var validatedToken
                );
                // check 2 : thuat toan
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
                //check 3 : Check accessToken expire ?

                var utcExpireDate = long.Parse(
                    tokenInVertification
                        .Claims.FirstOrDefault(x =>
                            x.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Exp
                        )
                        .Value
                );
                var expireDate = ConvertUnixTimeToDateTime(utcExpireDate);
                if (expireDate > DateTime.UtcNow)
                {
                    return BadRequest(
                        new ApiResponse
                        {
                            Success = false,
                            Message = "Access token has not yet expired"
                        }
                    );
                }

                //check 4 : check refreshToken exist in DB
                var storedToken = _dbContext.UserToken.FirstOrDefault(x =>
                    x.Token == model.RefreshToken
                );
                if (storedToken == null)
                {
                    return Ok(
                        new ApiResponse
                        {
                            Success = false,
                            Message = "Refresh token does not exits"
                        }
                    );
                }

                //check 5 : check refreshToken is used/revoked?

                if (storedToken.IsUsed)
                {
                    return Ok(
                        new ApiResponse { Success = false, Message = "Refresh token has been used" }
                    );
                }

                if (storedToken.IsRevoked)
                {
                    {
                        return Ok(
                            new ApiResponse
                            {
                                Success = false,
                                Message = "Refresh token has been revoked"
                            }
                        );
                    }
                }
                {
                    return Ok(
                        new ApiResponse { Success = false, Message = "Refresh token has been used" }
                    );
                }

                // check 6 : AccessToken id == jwtId in RefreshToken
                var jti = tokenInVertification
                    .Claims.FirstOrDefault(x =>
                        x.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti
                    )
                    .Value;

                if (storedToken.JwtId != jti)
                {
                    return Ok(
                        new ApiResponse { Success = false, Message = " token doesn't match " }
                    );
                }

                //Update token is used
                storedToken.IsRevoked = true;
                storedToken.IsUsed = true;

                _dbContext.Update(storedToken);
                await _dbContext.SaveChangesAsync();

                // create new token
                var account = await _dbContext.Users.SingleOrDefaultAsync(a =>
                    a.Id == storedToken.idUser
                );
                var token = await GenerationToken(account);

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
                    new ApiResponse { Success = false, Message = "SomeThing went Wrong" }
                );
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
