using ApiBasic.ApplicationServices.CommentsModule.Abstract;
using ApiBasic.ApplicationServices.CommentsModule.Dtos;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ApiControllerBase
    {
        private readonly ICommentServices _commentServices;

        public CommentsController(
            ICommentServices commentServices,
            ILogger<CommentsController> logger
        )
            : base(logger)
        {
            _commentServices = commentServices;
        }
        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(CreateCommentDto input)
        {
            try
            {
                _commentServices.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
        [Authorize]
        [HttpPost("Create-comment-child")]
        public IActionResult CreateCommentChild(CreateCommentChildDto input)
        {
            try
            {
                _commentServices.CreateCommentChild(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
