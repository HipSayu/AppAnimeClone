namespace ApiBasic.ApplicationServices.VideoModule.Dtos
{
    public class GetVideoByUserId
    {
        public int Id { get; set; }

        public string NameVideos { get; set; } = null!;
        public string UrlVideo { get; set; } = null!;
        public string AvatarVideoUrl { get; set; } = null!;
        public int Time { get; set; } = 0;

        public int IdUserCreateVideo { get; set; }
        public int dayAgo { get; set; }
    }
}
