using ApiBasic.ApplicationServices.VideoModule.Dtos;

namespace ApiBasic.ApplicationServices.UserModule.Dtos
{
    public class UserWithVideoDto
    {
        public int Id { get; set; }
        public string UserName { get; set; } = null!;

        public string TieuSu { get; set; }

        public string AvatarUrl { get; set; }

        public string BackgroundUrl { get; set; }

        public int Follower { get; set; }

        public int Following { get; set; }

        public List<GetVideoByUserId>? VideoUserFollow { get; set; }
    }
}
