using ApiBasic.Shared.Filter;

namespace ApiBasic.ApplicationServices.UserModule.Dtos
{
    public class FilterUserFollowHomeDto:FilterHomePageDto
    {
        public string NumberPhone { get; set; }
    }
}
