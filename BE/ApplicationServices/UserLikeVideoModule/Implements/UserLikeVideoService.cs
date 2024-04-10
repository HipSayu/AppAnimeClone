using ApiBasic.ApplicationServices.UserLikeModule.Abstract;
using ApiBasic.ApplicationServices.UserLikeVideoModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;

namespace ApiBasic.ApplicationServices.UserLikeVideoModule.Implements
{
    public class UserLikeVideoService : IUserLikeVideoService
    {
        private readonly AnimeAppContext _dbContext;

        public UserLikeVideoService(AnimeAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool CheckLike(CreateUserLikeVideoDto input)
        {
            var likes = _dbContext.UserLikeVideos.FirstOrDefault(l =>
                l.UserId == input.UserId && l.VideoId == input.VideoId
            );
            if (likes == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public void Create(CreateUserLikeVideoDto input)
        {
            var isLike = _dbContext.UserLikeVideos.FirstOrDefault(x =>
                x.UserId == input.UserId && x.VideoId == input.VideoId
            );
            if (isLike == null)
            {
                _dbContext.UserLikeVideos.Add(
                    new UserLikeVideo { UserId = input.UserId, VideoId = input.VideoId, }
                );
                _dbContext.SaveChanges();
            }
            else
            {
                throw new UserFriendlyExceptions("UserLikeVideos Đã tồn tại ");
            }
        }

        public void Delete(int id)
        {
            var user = _dbContext.UserLikeVideos.FirstOrDefault(p => p.Id == id);
            if (user == null)
            {
                throw new UserFriendlyExceptions("UserLikeVideos NOT Found");
            }
            _dbContext.UserLikeVideos.Remove(user);
            _dbContext.SaveChanges();
        }

        public void DeleteLike(CreateUserLikeVideoDto input)
        {
            var user = _dbContext.UserLikeVideos.FirstOrDefault(p =>
                p.UserId == input.UserId && p.VideoId == input.VideoId
            );
            if (user == null)
            {
                throw new UserFriendlyExceptions("UserLikeVideos NOT Found");
            }
            _dbContext.UserLikeVideos.Remove(user);
            _dbContext.SaveChanges();
            
        }

        public UserLikeVideoDto GetLike(int id)
        {
            var result =
                _dbContext
                    .UserLikeVideos.Where(p => p.Id == id)
                    .Select(p => new UserLikeVideoDto { VideoId = p.VideoId, UserId = p.UserId, })
                    .FirstOrDefault()
                ?? throw new UserFriendlyExceptions("UserLikeVideos NOT Found");
            return result;
        }

        public void Update(UpdateUserLikeVideoDto input)
        {
            var user = _dbContext.UserLikeVideos.FirstOrDefault(p => p.Id == input.Id);
            if (user == null)
            {
                throw new UserFriendlyExceptions("UserLikeVideos NOT Found");
            }
            user.UserId = input.UserId;
            user.VideoId = input.VideoId;
            _dbContext.SaveChanges();
        }
    }
}
