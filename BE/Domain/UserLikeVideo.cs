using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBasic.Domain
{
    [Table("UserLikeVideo")]
    public class UserLikeVideo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }

        public int VideoId { get; set; }

        public User User { get; set; }

        public Video Video { get; set; }
    }
}
