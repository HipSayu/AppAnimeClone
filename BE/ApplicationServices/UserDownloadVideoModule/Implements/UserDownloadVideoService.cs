using ApiBasic.ApplicationServices.UserDownloadVideoModule.Abstract;
using ApiBasic.ApplicationServices.UserDownloadVideoModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;

namespace ApiBasic.ApplicationServices.UserDisLikeVideoModule.Implements
{
    public class UserDownloadVideoService : IUserDownloadVideoService
    {
        private readonly AnimeAppContext _dbContext;

        public UserDownloadVideoService(AnimeAppContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public void Create(CreateUserDownloadVideoDto input)
        {
            _dbContext.UserDownloadVideos.Add(
                new UserDownloadVideo { UserId = input.UserId, VideoId = input.VideoId }
            );
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var obj =
                _dbContext.UserDownloadVideos.FirstOrDefault(x => x.UserId == id)
                ?? throw new UserFriendlyExceptions("UserDownloadVideos NOT Found");
            _dbContext.Remove(obj);
            _dbContext.SaveChanges();
        }

        public List<UserDownloadVideoDto> GetAll()
        {
            var results = new List<UserDownloadVideoDto>();
            foreach (var result in _dbContext.UserDownloadVideos)
            {
                results.Add(
                    new UserDownloadVideoDto
                    {
                        Id = result.Id,
                        VideoId = result.VideoId,
                        UserId = result.UserId,
                    }
                );
            }
            return results;
        }

        public UserDownloadVideoDto GetById(int id)
        {
            var result =
                _dbContext
                    .UserDownloadVideos.Where(x => x.Id == id)
                    .Select(p => new UserDownloadVideoDto
                    {
                        Id = p.Id,
                        VideoId = p.VideoId,
                        UserId = p.UserId,
                    })
                    .FirstOrDefault() ?? throw new UserFriendlyExceptions("UserDownloadVideos NOT Found");
            return result;
        }

        public void Update(UpdateUserDownloadVideoDto input)
        {
            var obj =
                _dbContext.UserDownloadVideos.FirstOrDefault(x => x.Id == input.Id)
                ?? throw new UserFriendlyExceptions("UserDownloadVideos NOT Found");
            obj.VideoId = input.VideoId;
            obj.UserId = input.UserId;
            _dbContext.SaveChanges();
        }
    }
}
