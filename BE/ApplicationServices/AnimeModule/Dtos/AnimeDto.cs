using ApiBasic.Domain;

namespace ApiBasic.ApplicationServices.AnimeModule.Dtos
{
    public class AnimeDto
    {
        public int Id { get; set; }
        public string AnimeId { get; set; }
        public string NameAnime { get; set; } = null!;
        public string Quality { get; set; }
        public int Age { get; set; } = 0;
        public string Detail { get; set; }
    }
}
