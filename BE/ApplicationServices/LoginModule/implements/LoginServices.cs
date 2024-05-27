using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ApiBasic.ApplicationServices.LoginModule.Abstract;
using ApiBasic.ApplicationServices.LoginModule.Dtos;
using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Constant;
using ApiBasic.Shared.Exceptions;
using ApiBasic.Shared.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

namespace ApiBasic.ApplicationServices.LoginModule.implements
{
    public class LoginServices : ILoginServices
    {
        private readonly AnimeAppContext _dbcontext;
        private readonly IConfiguration _configuration;
        private readonly AppSetting _appSetting;

        public LoginServices(
            AnimeAppContext dbcontext,
            IConfiguration configuration,
            IOptionsMonitor<AppSetting> optionsMonitor
        )
        {
            _dbcontext = dbcontext;
            _appSetting = optionsMonitor.CurrentValue;
            _configuration = configuration;
        }

        public bool CheckSoDienThoai(string SDT)
        {
            var user =
                _dbcontext.Users.FirstOrDefault(u => u.SĐT.Equals(SDT))
                ?? throw new UserFriendlyExceptions("số điện thoại không tồn tại");
            return true;
        }

        public LoginUserDto Login(LoginDto input)
        {
            var users = _dbcontext
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
            return new LoginUserDto
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
                Token = GetToken(input)
            };
        }

        public string GetToken(LoginDto input)
        {
            var user = _dbcontext.Users.FirstOrDefault(u => u.SĐT == input.NumberPhone);
            if (user == null)
            {
                throw new UserFriendlyExceptions(
                    $"Tên tài khoản \"{input.NumberPhone}\" chưa tồn tại "
                );
            }
            if (CommonUtils.CreateMD5(input.Password) == user.Password)
            {
                var authSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])
                );

                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.SĐT.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Name, user.SĐT),
                    new Claim(JwtRegisteredClaimNames.Name, user.Password),
                    new Claim(CustomClaimTypes.UserType, user.UserType.ToString()),
                };
                var token = new JwtSecurityToken(
                    issuer: _configuration["WT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddSeconds(_configuration.GetValue<int>("JWT:Expires")),
                    claims: claims,
                    signingCredentials: new SigningCredentials(
                        authSigningKey,
                        SecurityAlgorithms.HmacSha256
                    )
                );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            else
            {
                throw new UserFriendlyExceptions($"Mật khẩu không chính xác");
            }
        }

        public LogoutDto Logout(LogoutDto input)
        {
            return new LogoutDto
            {
                NumberPhone = "",
                Password = "",
                UserName = "",
            };
        }

        public LoginTokenDto LoginToken(LoginDto input)
        {
            var users = _dbcontext
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
                    password = e.Password,
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
            return new LoginTokenDto
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
                token = GenerationToken(result)
            };
        }

        private AccountToken GenerationToken(FindUserDto input)
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
                Expires = DateTime.UtcNow.AddSeconds(300000),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(secretKeyBytes),
                    SecurityAlgorithms.HmacSha512Signature
                )
            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);
            var accessToken = jwtTokenHandler.WriteToken(token);
            var refreshToken = GenerationRefreshToken();
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
    }
}
