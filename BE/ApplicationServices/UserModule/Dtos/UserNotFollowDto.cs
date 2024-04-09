namespace ApiBasic.ApplicationServices.UserModule.Dtos
{
    public class UserNotFollowDto
    {
        public int UserFollowId { get; set; }
        public string UserName { get; set; } = null!;
        public string AvatarUrl { get; set; }
    }
}
