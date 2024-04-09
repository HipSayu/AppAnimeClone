using ApiBasic.ApplicationServices.UserFollowModule.Abstract;
using ApiBasic.ApplicationServices.UserFollowModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;

namespace ApiBasic.ApplicationServices.UserFollowModule.Implements
{
    public class UserFollowService : IUserFollowServices
    {
        private readonly AnimeAppContext _dbContext;

        public UserFollowService(AnimeAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Create(CreateUserFollowDto input)
        {
            _dbContext.UserFollows.Add(
                new UserFollow { FollowerId = input.IdFollower, FollowingId = input.IdFollower }
            );
            _dbContext.SaveChanges();
        }

        public void Delete(int Id)
        {
            var userFollow = _dbContext.UserFollows.FirstOrDefault(s => s.Id == Id) ?? throw new UserFriendlyExceptions("UserFollow not Found");
            throw new NotImplementedException();
        }
    }
}
