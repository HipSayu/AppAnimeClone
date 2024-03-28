using ApiBasic.ApplicationServices.UserModule.Abstract;
using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;
using ApiBasic.Shared.Shared;
using ApiBasic.Shared.Utils;
using Microsoft.EntityFrameworkCore;

namespace ApiBasic.ApplicationServices.UserModule.Implements
{
    public class UserServices : IUserServices
    {
        private AnimeAppContext _dbcontext;

        public UserServices(AnimeAppContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void Create(CreateUserDto input)
        {
            if (_dbcontext.Users.Any(u => u.SĐT.Equals(input.SĐT)))
            {
                throw new UserFriendlyExceptions("Số điện thoại đã tồn tại");
            }

            _dbcontext.Add(
                new User
                {
                    UserName = input.UserName,
                    Password = CommonUtils.CreateMD5(input.Password),
                    SĐT = input.SĐT,
                    AvatarUrl = input.AvatarUrl,
                    BackgroundUrl = input.BackgroundUrl,
                    TieuSu = input.TieuSu,
                    UserType = 1,
                }
            );
            _dbcontext.SaveChanges();
        }

        public void Delete(int UserId)
        {
            var user =
                _dbcontext.Users.FirstOrDefault(u => u.Id == UserId)
                ?? throw new UserFriendlyExceptions("User không tìm thấy");
            _dbcontext.Remove(user);
            _dbcontext.SaveChanges();
        }

        public PageResultDto<List<FindUserDto>> GetAll(FilterDto input)
        {
            var users = _dbcontext
                .Users.Include(u => u.Followers)
                .ThenInclude(u => u.Following).ThenInclude(u => u.Videos)
                .Where(u => u.UserName.ToLower().Contains(input.Keyword.ToLower()))
                .Select(e => new FindUserDto
                {
                    UserName = e.UserName,
                    AvatarUrl = e.AvatarUrl,
                    BackgroundUrl = e.BackgroundUrl,
                    SĐT = e.SĐT,
                    TieuSu = e.TieuSu,
                    Follower = e.Following.Count(),
                    Following = e.Followers.Count(),
                    Videos = e.Videos.Count(),
                });
            users = users.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            return new PageResultDto<List<FindUserDto>>
            {
                Items = users.ToList(),
                TotalItem = users.Count(),
            };
        }

        public void Update(UpdateUserDto input)
        {
            var user =
                _dbcontext.Users.FirstOrDefault(u => u.Id == input.UserId)
                ?? throw new UserFriendlyExceptions("User không tìm thấy");
            user.UserName = input.UserName;
            user.Password = CommonUtils.CreateMD5(input.Password);
            user.AvatarUrl = input.AvatarUrl;
            user.BackgroundUrl = input.BackgroundUrl;
            user.TieuSu = input.TieuSu;

            _dbcontext.SaveChanges();
        }
    }
}
