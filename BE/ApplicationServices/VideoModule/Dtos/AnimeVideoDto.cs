namespace ApiBasic.ApplicationServices.VideoModule.Dtos
{
    public class AnimeVideoDto
    {
        public int IdVideo { get; set; }
        public string NameVideos { get; set; } = null!;
        public string UrlVideo { get; set; } = null!;
        public string AvatarVideoUrl { get; set; } = null!;
        public int Time { get; set; } = 0;
        public DateTime ThoiDiemTao { get; set; }
    }
}
