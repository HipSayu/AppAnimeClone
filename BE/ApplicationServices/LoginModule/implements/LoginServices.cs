using ApiBasic.ApplicationServices.LoginModule.Abstract;
using ApiBasic.ApplicationServices.LoginModule.Dtos;
using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;
using ApiBasic.Shared.Utils;
using Microsoft.EntityFrameworkCore;

namespace ApiBasic.ApplicationServices.LoginModule.implements
{
    public class LoginServices : ILoginServices
    {
        private AnimeAppContext _dbcontext;

        public LoginServices(AnimeAppContext dbcontext)
        {
            _dbcontext = dbcontext;
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
                .ThenInclude(u => u.Following).ThenInclude(u => u.Videos)
                .Where(u => u.SĐT.Equals(input.NumberPhone)
                        && u.UserName.Equals(input.UserName)
                        && u.Password.Equals(CommonUtils.CreateMD5(input.Password)))
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
            var result = users.FirstOrDefault() ?? throw new UserFriendlyExceptions("User không tìm thấy");
            return new LoginUserDto
            {
                Id= result.Id,
                UserName = result.UserName,
                AvatarUrl = result.AvatarUrl,
                BackgroundUrl = result.BackgroundUrl,
                SĐT = result.SĐT,
                TieuSu = result.TieuSu,
                Follower = result.Follower,
                Following = result.Following,
                Videos = result.Videos,
            };
        }
    }
}
