using ApiBasic.ApplicationServices.UserDisLikeVideoModule.Dtos;

namespace ApiBasic.ApplicationServices.UserDisLikeVideoModule.Abstract
{
    public interface IUserDislikeVideoService
    {
        void Create(CreateUserDislikeVideoDto input);
        void Update(UpdateUserDislikeVideoDto input);
        void Delete(int id);
        List<UserDislikeVideoDto> GetAll();
        UserDislikeVideoDto GetById(int id);
    }
}
