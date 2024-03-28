using System.ComponentModel.DataAnnotations;

namespace ApiBasic.ApplicationServices.UserModule.Dtos
{
    public class CreateUserDto
    {
        private string _userName;

        [Required]
        [MaxLength(50)]
        public string UserName
        {
            get => _userName;
            set => _userName = value?.Trim();
        }

        [MaxLength(50)]
        [MinLength(8)]
        private string _password;
        public string Password
        {
            get => _password;
            set => _password = value?.Trim();
        }

        [RegularExpression(@"^(?:\+?84|0)(\d{9,10})$")]
        public string SĐT { get; set; }

        public string TieuSu { get; set; }

        public string AvatarUrl { get; set; }

        public string BackgroundUrl { get; set; }
    }
}
