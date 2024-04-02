using ApiBasic.ApplicationServices.VideoModule.Dtos;
using ApiBasic.Shared.Shared;

namespace ApiBasic.ApplicationServices.UserModule.Dtos
{
    public class UserFollowDto
    {
        public int UserFollowId { get; set; }
        public string UserName { get; set; } = null!;
        public string AvatarUrl { get; set; }
        public List<GetVideoByUserId>? VideoUserFollow { get; set; }
    }
}
