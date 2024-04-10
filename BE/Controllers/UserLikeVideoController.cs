using ApiBasic.ApplicationServices.UserLikeModule.Abstract;
using ApiBasic.ApplicationServices.UserLikeVideoModule.Dtos;
using ApiBasic.Shared.Shared;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLikeVideoController : ApiControllerBase
    {
        private readonly IUserLikeVideoService _userLikeVideoService;

        public UserLikeVideoController(
            IUserLikeVideoService userLikeVideoService,
            ILogger<UserLikeVideoController> logger
        )
            : base(logger)
        {
            _userLikeVideoService = userLikeVideoService;
        }

        [HttpPost("Create")]
        public IActionResult Create(CreateUserLikeVideoDto input)
        {
            try
            {
                _userLikeVideoService.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("delete/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _userLikeVideoService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("CheckLikes")]
        public ActionResult CheckLikes([FromQuery] CreateUserLikeVideoDto input)
        {
            try
            {
                return Ok(_userLikeVideoService.CheckLike(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("deleteLike")]
        public ActionResult DeleteLike(CreateUserLikeVideoDto input)
        {
            try
            {
                _userLikeVideoService.DeleteLike(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
