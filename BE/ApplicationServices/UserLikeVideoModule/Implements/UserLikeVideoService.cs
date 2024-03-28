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

        public void Create(CreateUserLikeVideoDto input)
        {
            if (_dbContext.UserLikeVideos.Any(p => p.Id == input.Id))
            {
                throw new UserFriendlyExceptions("UserLikeVideos NOT Found");
            }
            _dbContext.UserLikeVideos.Add(
                new UserLikeVideo { UserId = input.UserId, VideoId = input.VideoId, }
            );
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _dbContext.UserLikeVideos.SingleOrDefault(p => p.Id == id);
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
