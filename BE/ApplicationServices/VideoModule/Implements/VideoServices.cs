using ApiBasic.ApplicationServices.CommentsModule.Dtos;
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
                    UsderId = v.User.Id,
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

        public VideoDto GetById(int IdVideo)
        {
            var video =
                _dbcontext
                    .Videos.Include(v => v.UserLikeVideos)
                    .FirstOrDefault(v => v.Id == IdVideo)
                ?? throw new UserFriendlyExceptions("Video không tìm thấy");
            return new VideoDto
            {
                UrlVideo = video.UrlVideo,
                Time = video.Time,
                AvatarVideoUrl = video.AvatarVideoUrl,
                Likes = video.UserLikeVideos.Count(),
                Id = video.Id,
                NameVideos = video.NameVideos,
                DayAgo = (DateTime.Now - video.ThoiDiemTao).Days
            };
        }

        public GetLikeVideoDtos GetLikeVideoByIdVideos(int VideoId)
        {
            var video =
                _dbcontext
                    .Videos.Include(a => a.UserLikeVideos)
                    .FirstOrDefault(v => v.Id == VideoId)
                ?? throw new UserFriendlyExceptions("Video không tìm thấy");
            return new GetLikeVideoDtos { likes = video.UserLikeVideos.Count() };
        }

        public PageResultDto<List<GetVideoByUserId>> GetVideoByUserId(FilterGetVideoById input)
        {
            var videos =
                from video in _dbcontext.Videos
                join user in _dbcontext.Users on video.UserId equals user.Id
                where user.Id == input.IdUser && video.AnimeId == 1
                select new GetVideoByUserId
                {
                    AvatarVideoUrl = video.AvatarVideoUrl,
                    Id = video.Id,
                    NameVideos = video.NameVideos,
                    Time = video.Time,
                    dayAgo = (DateTime.Now - video.ThoiDiemTao).Days,
                    UrlVideo = video.UrlVideo,
                };

            videos = videos.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            return new PageResultDto<List<GetVideoByUserId>>
            {
                Items = videos.ToList(),
                TotalItem = videos.Count(),
            };
        }

        public VideoWithCommentDto GetVideoWithCommentsById(int VideoId)
        {
            var commentParents = new List<GetCommentDto>();

            var commentPInVideo = _dbcontext
                .Comments.Include(c => c.User)
                .Where(c => c.VideoId == VideoId && c.ParentCommentId == null);

            foreach (var commentPV in commentPInVideo)
            {
                var commentChilds = _dbcontext
                    .Comments.Include(c => c.User)
                    .Where(c => c.VideoId == VideoId && c.ParentCommentId == commentPV.CommentId)
                    .Select(c => new GetCommentChildDto
                    {
                        ParentCommentId = commentPV.CommentId,
                        AvatarUrl = c.User.AvatarUrl,
                        Date = c.Date,
                        CommentId = c.CommentId,
                        Text = c.Text,
                        UserId = c.User.Id,
                        UserName = c.User.UserName,
                    })
                    .ToList();

                commentParents.Add(
                    new GetCommentDto
                    {
                        CommentId = commentPV.CommentId,
                        AvatarUrl = commentPV.User.AvatarUrl,
                        Date = commentPV.Date,
                        Text = commentPV.Text,
                        UserId = commentPV.User.Id,
                        UserName = commentPV.User.UserName,
                        VideoId = commentPV.VideoId,
                        CommentChilds = commentChilds
                    }
                );
            }

            var video =
                _dbcontext
                    .Videos.Include(e => e.User)
                    .Where(e => e.Id == VideoId)
                    .Select(e => new VideoWithCommentDto
                    {
                        Id = VideoId,
                        Time = e.Time,
                        dayAgo = (DateTime.Now - e.ThoiDiemTao).Days,
                        IdUserCreateVideo = e.UserId,
                        AvatarVideoUrl = e.AvatarVideoUrl,
                        NameVideos = e.NameVideos,
                        UrlVideo = e.UrlVideo,
                        Comments = commentParents,
                    })
                    .FirstOrDefault(e => e.Id == VideoId)
                ?? throw new UserFriendlyExceptions("Video không tìm thấy");
            return video;
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
