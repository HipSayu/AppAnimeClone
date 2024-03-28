using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.ApplicationServices.VideoModule.Dtos;
using ApiBasic.Shared.Shared;

namespace ApiBasic.ApplicationServices.VideoModule.Abstract
{
    public interface IVideoServices
    {
        void Create(CreateVideoDto input);
        void Update(UpdateVideoDto input);

        void Delete(int UserId);

        PageResultDto<List<FindVideoDto>> GetAll(FilterDto input);
    }
}
