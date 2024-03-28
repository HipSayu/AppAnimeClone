namespace ApiBasic.ApplicationServices.UserModule.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }

        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string SĐT { get; set; }

        public string TieuSu { get; set; }
        
        public string AvatarUrl { get; set; }

        public string BackgroundUrl { get; set; }

        public int UserType { get; set; }
    }
}
