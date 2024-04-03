namespace ApiBasic.ApplicationServices.VideoModule.Dtos
{
    public class FindVideoDto
    {
        public int Id { get; set; }
        public int UsderId { get; set; }
        public string NameVideos { get; set; } = null!;
        public string UrlVideo { get; set; } = null!;
        public string AvatarVideoUrl { get; set; } = null!;
        public int Time { get; set; } = 0;
        public DateTime ThoiDiemTao { get; set; }
        public string? AnimeName { get; set; }

        /*  public int Likes { get; set; } = 0;
          public int Viewer { get; set; } = 0;
  
          public int DisLike { get; set; } = 0;*/

        public string? nameUser { get; set; }
        public string? AvatarUserUrl { get; set; }
    }
}
