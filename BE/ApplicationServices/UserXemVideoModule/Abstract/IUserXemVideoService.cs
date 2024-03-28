using ApiBasic.ApplicationServices.UserXemVideoModule.Dtos;

namespace ApiBasic.ApplicationServices.UserXemVideoModule.Abstract
{
    public interface IUserXemVideoService
    {
        void Create(CreateUserXemVideoDto input);
        void Delete(int id);
        void Update(UpdateUserXemVideoDto input);
        UserXemVideoDto GetVideo(int id);
    }
}
