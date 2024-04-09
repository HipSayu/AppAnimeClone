using ApiBasic.ApplicationServices.UserFollowModule.Dtos;

namespace ApiBasic.ApplicationServices.UserFollowModule.Abstract
{
    public interface IUserFollowServices
    {
        void Create(CreateUserFollowDto input);
        void Delete(int Id);
    }
}
