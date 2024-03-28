using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBasic.Domain
{
    [Table("UserFollow")]
    public class UserFollow
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int FollowerId { get; set; } // UserId của người theo dõi
        public User Follower { get; set; }

        public int FollowingId { get; set; } // UserId của người được theo dõi
        public User Following { get; set; }
    }
}
