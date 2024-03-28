using ApiBasic.Domain;

namespace ApiBasic.ApplicationServices.SearchModule.Dtos
{
    public class SearchDto
    {
        public int Id { get; set; }

        public string? SearchKeyWord { get; set; }
        public int UserId { get; set; }
    }
}
