using ApiBasic.ApplicationServices.SearchModule.Abstract;
using ApiBasic.ApplicationServices.SearchModule.Dtos;
using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.Shared.Filter;
using ApiBasic.Shared.Shared;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ApiControllerBase
    {
        private readonly ISearchServices _searchServices;

        public SearchController(ISearchServices searchServices, ILogger<SearchController> logger)
            : base(logger)
        {
            _searchServices = searchServices;
        }
        [HttpPost("create")]
        public ActionResult Create(CreateSearchDto input)
        {
            try
            {
                _searchServices.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("delete/{searchId}")]
        public ActionResult Delete(int searchId)
        {
            try
            {
                _searchServices.Delete(searchId);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
        [HttpGet("get-all")]
        public ActionResult GetAll(SearchFilterDto input)
        {
            try
            {
                return Ok(_searchServices.GetAllSearch(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get-all-page")]
        public ActionResult GetAllSearchPage(FilterPageDto input)
        {
            try
            {
                return Ok(_searchServices.GetAllPage(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }


    }
}
