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
            var check = _dbContext.UserFollows.FirstOrDefault(a =>
                a.FollowerId == input.IdFollower && a.FollowingId == input.IdFollowing
            );
            if (check != null)
            {
                throw new UserFriendlyExceptions("UserFollow đã tồn tại");
            }
            else
            {
                _dbContext.UserFollows.Add(
                    new UserFollow
                    {
                        FollowerId = input.IdFollower,
                        FollowingId = input.IdFollowing
                    }
                );
                _dbContext.SaveChanges();
            }
        }

        public bool CheckFollow(CreateUserFollowDto input)
        {
            var check = _dbContext.UserFollows.FirstOrDefault(a =>
                a.FollowerId == input.IdFollower && a.FollowingId == input.IdFollowing
            );
            if (check == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public void Delete(int Id)
        {
            var userFollow =
                _dbContext.UserFollows.FirstOrDefault(s => s.Id == Id)
                ?? throw new UserFriendlyExceptions("UserFollow not Found");
            throw new NotImplementedException();
        }

        public void Unfollow(UnFollowDtto input)
        {
            var userFollows =
                _dbContext.UserFollows.FirstOrDefault(u =>
                    u.FollowerId == input.IdFollower && u.FollowingId == input.IdFollowing
                ) ?? throw new UserFriendlyExceptions("UserFollow not Found");
            _dbContext.UserFollows.Remove(userFollows);
            _dbContext.SaveChanges();
        }
    }
}
