using ApiBasic.ApplicationServices.VideoModule.Abstract;
using ApiBasic.ApplicationServices.VideoModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;
using ApiBasic.Shared.Shared;
using Microsoft.EntityFrameworkCore;

namespace ApiBasic.ApplicationServices.VideoModule.Implements
{
    public class VideoServices : IVideoServices
    {
        private AnimeAppContext _dbcontext;

        public VideoServices(AnimeAppContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void Create(CreateVideoDto input)
        {
            _dbcontext.Videos.Add(
                new Video
                {
                    UserId = input.UserId,
                    NameVideos = input.NameVideos,
                    ThoiDiemTao = input.ThoiDiemTao,
                    Time = input.Time,
                    AvatarVideoUrl = input.AvatarVideoUrl,
                    UrlVideo = input.UrlVideo,
                    VideoId = input.VideoId,
                    AnimeId = input.AnimeId,
                }
            );
            _dbcontext.SaveChanges();
        }

        public void Delete(int VideoId)
        {
            var video =
                _dbcontext.Videos.FirstOrDefault(v => v.Id == VideoId)
                ?? throw new UserFriendlyExceptions("Video không tìm thấy");
            _dbcontext.Remove(video);
            _dbcontext.SaveChanges();
        }

        public PageResultDto<List<FindVideoDto>> GetAll(FilterDto input)
        {
            var videos = _dbcontext
                .Videos.Include(v => v.User)
                .Where(v => v.NameVideos.ToLower().Contains(input.Keyword.ToLower()))
                .Select(v => new FindVideoDto
                {
                    NameVideos = v.NameVideos,
                    ThoiDiemTao = v.ThoiDiemTao,
                    Time = v.Time,
                    AvatarVideoUrl = v.AvatarVideoUrl,
                    UrlVideo = v.UrlVideo,
                    Id = v.Id,
                    VideoId = v.VideoId,
                    nameUser = v.User.UserName,
                    AvatarUserUrl = v.User.AvatarUrl,
                });
            videos = videos.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            return new PageResultDto<List<FindVideoDto>>
            {
                Items = videos.ToList(),
                TotalItem = videos.Count(),
            };
        }

        public PageResultDto<List<GetVideoByUserId>> GetVideoByUserId(FilterGetVideoById input)
        {
            var videos = from video in _dbcontext.Videos
                         join user in _dbcontext.Users
                         on video.UserId equals user.Id
                         where user.Id == input.IdUser
                         select new GetVideoByUserId
                         {
                             AvatarUserUrl = video.AvatarVideoUrl,
                             AvatarVideoUrl = video.AvatarVideoUrl,
                             Id = video.Id,
                             VideoId = video.VideoId,
                             NameVideos = video.NameVideos,
                             Time = video.Time,
                             dayAgo = DateTime.Now.Day - video.ThoiDiemTao.Day,
                             UrlVideo = video.UrlVideo,
                             nameUser = user.UserName,
                         };

            videos = videos.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            return new PageResultDto<List<GetVideoByUserId>>
            {
                Items = videos.ToList(),
                TotalItem = videos.Count(),
            };
            
        }

        public void Update(UpdateVideoDto input)
        {
            var video =
                _dbcontext.Videos.FirstOrDefault(v => v.Id == input.VideoId)
                ?? throw new UserFriendlyExceptions("Video không tìm thấy");
            video.UrlVideo = input.UrlVideo;
            video.AvatarVideoUrl = input.AvatarVideoUrl;
            video.NameVideos = input.NameVideos;
            video.ThoiDiemTao = input.ThoiDiemTao;
            video.UrlVideo = input.UrlVideo;
            video.Time = input.Time;
            _dbcontext.SaveChanges();
        }

       
    }
}
