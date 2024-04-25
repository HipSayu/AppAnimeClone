using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ApiBasic.Domain
{
    [Table("User")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string UserName { get; set; } = null!;

        [MaxLength(50)]
        [MinLength(8)]
        public string Password { get; set; } = null!;

        [RegularExpression(@"^(?:\+?84|0)(\d{9,10})$")]
        public string SĐT { get; set; } = null !;
        public string? TieuSu { get; set; }
        public string? AvatarUrl { get; set; }
        public string? BackgroundUrl { get; set; }

        public int UserType { get; set; }

       /* public UserToken userToken { get; set; }*/
        public ICollection<UserToken> UserTokens { get; set; }
        public ICollection<Comment> Comments { get; set; }

        // Danh sách các user mà user này đang theo dõi
        public ICollection<UserFollow> Following { get; set; }

        // Danh sách các user đang theo dõi user này
        public ICollection<UserFollow> Followers { get; set; }

        public ICollection<UserLikeVideo> UserLikeVideos { get; set; }
        public ICollection<UserDisLikeVideo> UserDisLikeVideos { get; set; }
        public ICollection<Video> Videos { get; set; }
        public ICollection<UserXemVideo> UserXemVideos { get; set; }
        public ICollection<UserDownloadVideo> UserDownloadVideo { get; set; }
      
        public ICollection<Search> Searchs { get; set; }
    }
}
