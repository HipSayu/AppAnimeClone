namespace ApiBasic.ApplicationServices.SearchModule.Dtos
{
    public class CreateSearchDto
    {
        private string _search;
        public int UserId { get; set; }
        public string SearchKeyWord
        {
            get => _search;
            set => _search = value?.Trim();
        }
    }
}
