using ApiBasic.ApplicationServices.UserDisLikeVideoModule.Abstract;
using ApiBasic.ApplicationServices.UserDisLikeVideoModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;

namespace ApiBasic.ApplicationServices.UserDisLikeVideoModule.Implements
{
    public class UserDislikeVideoService : IUserDislikeVideoService
    {
        private readonly AnimeAppContext _dbContext;

        public UserDislikeVideoService(AnimeAppContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public void Create(CreateUserDislikeVideoDto input)
        {
            _dbContext.UserDisLikeVideos.Add(
                new UserDisLikeVideo { UserId = input.UserId, VideoId = input.VideoId, }
            );
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var obj =
                _dbContext.UserDisLikeVideos.FirstOrDefault(x => x.UserId == id)
                ?? throw new UserFriendlyExceptions("UserDislikeNotFound");
            _dbContext.Remove(obj);
            _dbContext.SaveChanges();
        }

        public List<UserDislikeVideoDto> GetAll()
        {
            var results = new List<UserDislikeVideoDto>();
            foreach (var result in _dbContext.UserDisLikeVideos)
            {
                results.Add(
                    new UserDislikeVideoDto
                    {
                        Id = result.Id,
                        VideoId = result.VideoId,
                        UserId = result.UserId,
                    }
                );
            }
            return results;
        }

        public UserDislikeVideoDto GetById(int id)
        {
            var result =
                _dbContext
                    .UserDisLikeVideos.Where(x => x.Id == id)
                    .Select(p => new UserDislikeVideoDto
                    {
                        Id = p.Id,
                        VideoId = p.VideoId,
                        UserId = p.UserId,
                    })
                    .FirstOrDefault() ?? throw new UserFriendlyExceptions("UserDislikeNotFound");
            return result;
        }

        public void Update(UpdateUserDislikeVideoDto input)
        {
            var obj =
                _dbContext.UserDisLikeVideos.FirstOrDefault(x => x.Id == input.Id)
                ?? throw new UserFriendlyExceptions("UserDislikeNotFound");
            obj.VideoId = input.VideoId;
            obj.UserId = input.UserId;
            _dbContext.SaveChanges();
        }
    }
}
