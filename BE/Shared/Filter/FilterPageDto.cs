using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Shared.Filter
{
    public class FilterPageDto
    {
        [FromQuery(Name = "pageSize")]
        public int PageSize { get; set; }
        [FromQuery(Name = "pageIndex")]
        public int PageIndex { get; set; }

        public int UserId { get; set; }
    }
}
