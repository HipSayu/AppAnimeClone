using ApiBasic.Domain;

namespace ApiBasic.ApplicationServices.VideoModule.Dtos
{
    public class VideoDto
    {
        public int Id { get; set; }

        public string NameVideos { get; set; } = null!;
        public string UrlVideo { get; set; } = null!;
        public string AvatarVideoUrl { get; set; } = null!;
        public int Time { get; set; }
        public int DayAgo { get; set; }
    }
}
