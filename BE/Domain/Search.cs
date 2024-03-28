using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBasic.Domain
{
    [Table("Search")]
    public class Search
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string SearchKeyWord { get; set; } = null!;

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
