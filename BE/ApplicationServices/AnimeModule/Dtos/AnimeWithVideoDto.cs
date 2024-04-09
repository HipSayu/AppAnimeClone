using ApiBasic.ApplicationServices.VideoModule.Dtos;

namespace ApiBasic.ApplicationServices.AnimeModule.Dtos
{
    public class AnimeWithVideoDto
    {
        public int Id { get; set; }
       
        public string NameAnime { get; set; } = null!;
        public string Quality { get; set; }
        public int Age { get; set; } = 0;
        public string Detail { get; set; }
        public List<AnimeVideoDto> AnimeVideos { get; set; }
    }
}
