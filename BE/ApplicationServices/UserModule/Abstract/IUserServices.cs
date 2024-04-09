using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.Shared.Shared;

namespace ApiBasic.ApplicationServices.UserModule.Abstract
{
    public interface IUserServices
    {
        void Create(CreateUserDto input);
        void Update(UpdateUserDto input);
        void Delete(int UserId);

        PageResultDto<List<FindUserDto>> GetAll(FilterDto input);
        FindUserDto FindById(int UserId);
        PageResultDto<List<UserFollowDto>> GetAllUserFollow(FilterUserFollowDto input);

        UserWithVideoDto GetUserWithVideoById(int UserId);

        PageResultDto<List<UserNotFollowDto>> GetAllUserNotFollow(FilterUserFollowDto input);
    }
}
