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

        PageResultDto<List<FindVideoDto>> GetAll(FilterVideoDto input);
        PageResultDto<List<FindVideoDto>> GetAllNoKeyWord(FilterVideoHomeDto input);
        PageResultDto<List<GetVideoByUserId>> GetVideoByUserId(FilterGetVideoById input);

        VideoDto GetById(int IdVideo);
        VideoWithCommentDto GetVideoWithCommentsById(int VideoId);

        GetLikeVideoDtos GetLikeVideoByIdVideos(int VideoId);
    }
}
