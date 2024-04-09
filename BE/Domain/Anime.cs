using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBasic.Domain
{
    [Table("Anime")]
    public class Anime
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string AnimeId { get; set; }

        public string NameAnime { get; set; } = null!;
        public string Quality { get; set; }

        public int Age { get; set; } = 0;
        public string Detail { get; set; }
        public string AnimeUrl { get; set; }
        public ICollection<TheLoaiAnime> theLoaiAnimes { get; set; }
        public ICollection<Video> videos { get; set; }
    }
}
