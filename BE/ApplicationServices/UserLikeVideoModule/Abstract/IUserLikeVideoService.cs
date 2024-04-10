using ApiBasic.ApplicationServices.UserLikeVideoModule.Dtos;

namespace ApiBasic.ApplicationServices.UserLikeModule.Abstract
{
    public interface IUserLikeVideoService
    {
        void Create(CreateUserLikeVideoDto input);
        void Delete(int id);
        void Update(UpdateUserLikeVideoDto input);
        UserLikeVideoDto GetLike(int id);

        bool CheckLike(CreateUserLikeVideoDto input);
        void DeleteLike(CreateUserLikeVideoDto input);
    }
}
