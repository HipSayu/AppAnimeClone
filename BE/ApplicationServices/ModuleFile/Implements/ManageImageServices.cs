using ApiBasic.ApplicationServices.ModuleFile.Abstract;
using ApiBasic.Helper;
using Microsoft.AspNetCore.StaticFiles;

namespace ApiBasic.ApplicationServices.ModuleFile.Implements
{
    public class ManageImageServices : IManageImageServices
    {
        public async Task<string> UploadFile(IFormFile _IFormFile)
        {
            string FileName = "";

            FileInfo _FileInfo = new FileInfo(_IFormFile.FileName);
            FileName =
                _IFormFile.FileName + "_" + DateTime.Now.Ticks.ToString() + _FileInfo.Extension;
            var _GetFilePath = Common.GetFilePath(FileName);
            using (var _FileStream = new FileStream(_GetFilePath, FileMode.Create))
            {
                await _IFormFile.CopyToAsync(_FileStream);
            }
            return FileName;
        }

        public async Task<(byte[], string, string)> DownloadFile(string FileName)
        {
            var _GetFilePath = Common.GetFilePath(FileName);
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(_GetFilePath, out var _ContentType))
            {
                _ContentType = "application/octet-stream";
            }
            var _ReadAllBytesAsync = await File.ReadAllBytesAsync(_GetFilePath);
            return (_ReadAllBytesAsync, _ContentType, Path.GetFileName(_GetFilePath));
        }

        
    }
}
