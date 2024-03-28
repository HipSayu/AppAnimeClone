using ApiBasic.ApplicationServices.UserXemVideoModule.Abstract;
using ApiBasic.ApplicationServices.UserXemVideoModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;

namespace ApiBasic.ApplicationServices.UserXemVideoModule.Implements
{
    public class UserXemVideoService : IUserXemVideoService
    {
        private readonly AnimeAppContext _dbContext;

        public UserXemVideoService(AnimeAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Create(CreateUserXemVideoDto input)
        {
            if (_dbContext.UserXemVideos.Any(p => p.Id == input.Id))
            {
                throw new UserFriendlyExceptions("UserXemVideos NOT Found");
            }
            _dbContext.UserXemVideos.Add(
                new UserXemVideo { UserId = input.UserId, VideoId = input.VideoId, }
            );
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _dbContext.UserXemVideos.SingleOrDefault(p => p.Id == id);
            if (user == null)
            {
                throw new UserFriendlyExceptions("UserXemVideos NOT Found");
            }
            _dbContext.UserXemVideos.Remove(user);
            _dbContext.SaveChanges();
        }

        public UserXemVideoDto GetVideo(int id)
        {
            var result =
                _dbContext
                    .UserXemVideos.Where(p => p.Id == id)
                    .Select(p => new UserXemVideoDto { VideoId = p.VideoId, UserId = p.UserId, })
                    .FirstOrDefault()
                ?? throw new UserFriendlyExceptions("UserXemVideos NOT Found");
            return result;
        }

        public void Update(UpdateUserXemVideoDto input)
        {
            var user = _dbContext.UserXemVideos.FirstOrDefault(p => p.Id == input.Id);
            if (user == null)
            {
                throw new UserFriendlyExceptions("UserXemVideos NOT Found");
            }
            user.UserId = input.UserId;
            user.VideoId = input.VideoId;
            _dbContext.SaveChanges();
        }
    }
}
