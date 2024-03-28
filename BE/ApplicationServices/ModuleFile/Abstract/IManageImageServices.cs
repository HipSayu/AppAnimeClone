namespace ApiBasic.ApplicationServices.ModuleFile.Abstract
{
    public interface IManageImageServices
    {
        Task<string> UploadFile(IFormFile _IFormFile);
        Task<(byte[], string, string)> DownloadFile(string FileName);
    }
}
