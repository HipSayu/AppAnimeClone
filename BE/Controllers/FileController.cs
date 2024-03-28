using ApiBasic.ApplicationServices.ModuleFile.Abstract;
using ApiBasic.ApplicationServices.UserModule.Abstract;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ApiControllerBase
    {
        private readonly IManageImageServices _manageImageServices;

        public FileController(
            IManageImageServices manageImageServices,
            ILogger<FileController> logger
        )
            : base(logger)
        {
            _manageImageServices = manageImageServices;
        }

        [HttpPost("uploadfile")]
        public async Task<IActionResult> UploadFile(IFormFile _IFormFile)
        {
            var result = await _manageImageServices.UploadFile(_IFormFile);
            return Ok(result);
        }

        [HttpGet("downloadfile")]
        public async Task<IActionResult> DownloadFile(string FileName)
        {
            var result = await _manageImageServices.DownloadFile(FileName);
            return File(result.Item1, result.Item2, result.Item2);
        }
    }
}
