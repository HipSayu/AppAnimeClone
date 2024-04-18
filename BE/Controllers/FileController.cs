using ApiBasic.ApplicationServices.ModuleFile.Abstract;
using ApiBasic.ApplicationServices.ModuleFile.Dtos;
using ApiBasic.ApplicationServices.UserModule.Abstract;
using ApiBasic.Helper;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ApiControllerBase
    {
        public static IWebHostEnvironment _webHostEnvironment;

        private readonly IManageImageServices _manageImageServices;

        public FileController(
            IWebHostEnvironment webHostEnvironment,
            IManageImageServices manageImageServices,
            ILogger<FileController> logger
        )
            : base(logger)
        {
            _manageImageServices = manageImageServices;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("uploadfile")]
        public async Task<IActionResult> UploadFile([FromForm] UploadFileDto _IFormFile)
        {
            var result = await _manageImageServices.UploadFile(_IFormFile.files);
            return Ok(result);
        }


/*
        [HttpPost("uploadfile_Video")]
        public async Task<IActionResult> UploadFileVideo([FromForm] UploadFileDto obj)
        {
           if(obj.files.Length > 0)
            {
                try
                {
                    if(!Directory.Exists(_webHostEnvironment.WebRootPath + "\\Uploads\\"))
                }
            }
        }*/


        [HttpGet("downloadfile")]
        public async Task<IActionResult> DownloadFile(string FileName)
        {
            var result = await _manageImageServices.DownloadFile(FileName);
            return File(result.Item1, result.Item2, result.Item2);
        }
        [HttpGet("GetImage/{fileName}")]
        public  IActionResult GetImage([FromRoute] string fileName)
        {
            var _GetFilePath = Common.GetFilePath(fileName);

            byte[] imageBytes = System.IO.File.ReadAllBytes(_GetFilePath);
            return File(imageBytes, "image/jpeg");
        }
        [HttpGet("GetVideo/{fileName}")]
        public IActionResult GetVideo([FromRoute] string fileName)
        {
            var _GetFilePath = Common.GetFilePath(fileName);

            byte[] imageBytes = System.IO.File.ReadAllBytes(_GetFilePath);
            return File(imageBytes, "video/mp4");
        }
    }
}
