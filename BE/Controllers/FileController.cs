using ApiBasic.ApplicationServices.ModuleFile.Abstract;
using ApiBasic.ApplicationServices.ModuleFile.Dtos;
using ApiBasic.ApplicationServices.UserModule.Abstract;
using ApiBasic.Helper;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Authorization;
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

        /*[Authorize]*/
        [HttpPost("uploadfile")]
        public async Task<IActionResult> UploadFile(IFormFile _IFormFile)
        {
            try
            {
                var result = await _manageImageServices.UploadFile(_IFormFile);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [Authorize]
        [HttpGet("downloadfile")]
        public async Task<IActionResult> DownloadFile(string FileName)
        {
            var result = await _manageImageServices.DownloadFile(FileName);
            return File(result.Item1, result.Item2, result.Item2);
        }

        [HttpGet("GetImage/{fileName}")]
        public IActionResult GetImage([FromRoute] string fileName)
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

        [HttpPost("upload_test")]
        public async Task<IActionResult> UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0]; // Assuming you're expecting only one file

                if (file != null && file.Length > 0)
                {
                    // Lấy tên tệp và đường dẫn
                    var fileName = Path.GetFileName(file.FileName);

                    var filePath = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "Uploads",
                        fileName
                    );

                    string[] parts = fileName.Split('.');
                    // Lưu tệp vào đường dẫn cụ thể
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // Thông báo thành công
                    if (parts[1] == "mp4")
                    {
                        return Ok($"http://localhost:5179/api/File/GetVideo/{fileName}");
                    }
                    else
                    {
                        return Ok($"http://localhost:5179/api/File/GetImage/{fileName}");
                    }
                }
                else
                {
                    return BadRequest("No file uploaded.");
                }
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
