namespace ApiBasic.ApplicationServices.AnimeModule.Dtos
{
    public class AnimeViewDto
    {
        public int Id { get; set; }
        public string NameAnime { get; set; } = null!;
        public string Quality { get; set; }

        public string AnimeUrl { get; set; }
    }
}
