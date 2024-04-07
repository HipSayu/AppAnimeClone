using ApiBasic.ApplicationServices.CommentsModule.Dtos;

namespace ApiBasic.ApplicationServices.VideoModule.Dtos
{
    public class VideoWithCommentDto
    {
        public int Id { get; set; }
        public string NameVideos { get; set; } = null!;
        public string UrlVideo { get; set; } = null!;
        public string AvatarVideoUrl { get; set; } = null!;
        public int Time { get; set; } = 0;
        public List<GetCommentDto> Comments { get; set; }
        public int IdUserCreateVideo { get; set; }

        public int dayAgo { get; set; }
    }
}
