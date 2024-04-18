namespace ApiBasic.ApplicationServices.ModuleFile.Dtos
{
    public class UploadFileDto
    {
        public IFormFile files { get; set; }    
        public string FileName { get; set; }
    }
}
