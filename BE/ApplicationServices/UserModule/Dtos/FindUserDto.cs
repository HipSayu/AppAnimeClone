namespace ApiBasic.ApplicationServices.UserModule.Dtos
{
    public class FindUserDto
    {
        public string UserName { get; set; } = null!;

        public string SĐT { get; set; }

        public string TieuSu { get; set; }

        public string AvatarUrl { get; set; }

        public string BackgroundUrl { get; set; }

        public int Follower { get; set; }

        public int Following { get; set; }
        public int Videos { get; set; }
    }
}
