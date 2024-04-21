namespace ApiBasic.ApplicationServices.LoginModule.Dtos
{
    public class LoginTokenDto
    {
        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public ApiResponse TokenResponse { get; set; } = null!;

        public string SĐT { get; set; }

        public string TieuSu { get; set; }

        public string AvatarUrl { get; set; }

        public string BackgroundUrl { get; set; }

        public int Follower { get; set; }

        public int Following { get; set; }
        public int Videos { get; set; }

    }
}
