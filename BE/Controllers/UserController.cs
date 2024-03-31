using ApiBasic.ApplicationServices.UserModule.Abstract;
using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.Shared.Shared;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("ApiCorsPolicy")]
    [ApiController]
    public class UserController : ApiControllerBase
    {
        private readonly IUserServices _iUserServices;

        public UserController(IUserServices iUserServices, ILogger<UserController> logger)
            : base(logger)
        {
            _iUserServices = iUserServices;
        }

        [HttpGet("get-all")]
        public ActionResult GetAll(FilterDto input)
        {
            try
            {
                return Ok(_iUserServices.GetAll(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPost("create")]
        public ActionResult Create(CreateUserDto input)
        {
            try
            {
                _iUserServices.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("delete/{userId}")]
        public ActionResult Delete(int userId)
        {
            try
            {
                _iUserServices.Delete(userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("update")]
        public ActionResult Update(UpdateUserDto input)
        {
            try
            {
                _iUserServices.Update(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get-by-id/{UserId}")]
        public ActionResult GetById(int UserId)
        {
            try
            {
                return Ok(_iUserServices.FindById(UserId));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
