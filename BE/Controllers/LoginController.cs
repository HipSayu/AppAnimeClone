using ApiBasic.ApplicationServices.LoginModule.Abstract;
using ApiBasic.ApplicationServices.LoginModule.Dtos;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ApiControllerBase
    {
        private readonly ILoginServices _loginServices;

        public LoginController(ILoginServices loginServices, ILogger<LoginController> logger)
            : base(logger)
        {
            _loginServices = loginServices;
        }

        [HttpGet("CheckSDT/{SDT}")]
        public IActionResult CheckSDT(string SDT)
        {
            try
            {
                return Ok(_loginServices.CheckSoDienThoai(SDT));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("Login")]
        public IActionResult Login([FromQuery] LoginDto input)
        {
            try
            {
                return Ok(_loginServices.Login(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("Logout")]
        public IActionResult Logout([FromQuery] LogoutDto input)
        {
            try
            {
                return Ok(_loginServices.Logout(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
