using ApiBasic.ApplicationServices.UserDownloadVideoModule.Dtos;

namespace ApiBasic.ApplicationServices.UserDownloadVideoModule.Abstract
{
    public interface IUserDownloadVideoService
    {
        void Create(CreateUserDownloadVideoDto input);
        void Update(UpdateUserDownloadVideoDto input);
        void Delete(int id);
        List<UserDownloadVideoDto> GetAll();
        UserDownloadVideoDto GetById(int id);
    }
}
