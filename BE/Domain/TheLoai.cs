using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBasic.Domain
{
    [Table("TheLoai")]
    public class TheLoai
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string TenTheLoai { get; set; } = null!;
        public ICollection<TheLoaiAnime> theLoaiAnimes { get; set; }
    }
}
