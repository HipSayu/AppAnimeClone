using System.ComponentModel.DataAnnotations;
using ApiBasic.Domain;

namespace ApiBasic.ApplicationServices.VideoModule.Dtos
{
    public class CreateVideoDto
    {
        public string VideoId { get; set; } = null!;
        public int UserId { get; set; }
        public string NameVideos { get; set; } = null!;
        public string UrlVideo { get; set; } = null!;
        public string AvatarVideoUrl { get; set; } = null!;
        public int Time { get; set; } = 0;
        public DateTime ThoiDiemTao { get; set; }
        public int AnimeId { get; set; }
    }
}
