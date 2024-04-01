using ApiBasic.Shared.Shared;

namespace ApiBasic.ApplicationServices.UserModule.Dtos
{
    public class FilterUserFollowDto:FilterDto
    {
        public int UserId { get; set; }
    }
}
