using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBasic.Domain
{
    [Table("Video")]
    public class Video
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AnimeId { get; set; }
        public string VideoId { get; set; } = null!;
        public string NameVideos { get; set; } = null!;
        public string UrlVideo { get; set; } = null!;
        public string AvatarVideoUrl { get; set; } = null!;
        public int Time { get; set; } = 0;
        public DateTime ThoiDiemTao { get; set; }
        public Anime Anime { get; set; } 
        public User User { get; set; } = null!;
        public ICollection<Comment>? Comments { get; set; }
        public ICollection<UserLikeVideo>? UserLikeVideos { get; set; }
        public ICollection<UserDisLikeVideo>? UserDisLikeVideos { get; set; }
        public ICollection<UserXemVideo>? UserXemVideos { get; set; }
        public ICollection<UserDownloadVideo>? UserDownloadVideo { get; set; }
    }
}
