using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBasic.Domain
{
    [Table("TheLoaiAnime")]
    public class TheLoaiAnime
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int AnimeId { get; set; }
        public int TheLoaiId { get; set; }

        public Anime Anime { get; set; }    

        public TheLoai TheLoai { get; set; }    
    }
}
