using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.ApplicationServices.VideoModule.Dtos
{
    public class FilterVideoHomeDto
    {
        [FromQuery(Name = "pageSize")]
        public int PageSize { get; set; }

        [FromQuery(Name = "pageIndex")]
        public int PageIndex { get; set; }
    }
}
