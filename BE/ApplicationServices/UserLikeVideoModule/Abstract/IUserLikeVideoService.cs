using ApiBasic.ApplicationServices.UserLikeVideoModule.Dtos;
using ApiBasic.ApplicationServices.UserXemVideoModule.Dtos;

namespace ApiBasic.ApplicationServices.UserLikeModule.Abstract
{
    public interface IUserLikeVideoService
    {
        void Create(CreateUserLikeVideoDto input);
        void Delete(int id);
        void Update(UpdateUserLikeVideoDto input);
        UserLikeVideoDto GetLike(int id);
    }
}
