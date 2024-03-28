using ApiBasic.ApplicationServices.SearchModule.Dtos;
using ApiBasic.ApplicationServices.VideoModule.Dtos;
using ApiBasic.Shared.Filter;
using ApiBasic.Shared.Shared;

namespace ApiBasic.ApplicationServices.SearchModule.Abstract
{
    public interface ISearchServices
    {
        void Create(CreateSearchDto input);
        void Delete(int SearchId);

        PageResultDto<List<SearchDto>> GetAllSearch(SearchFilterDto input);
        PageResultDto<List<SearchDto>> GetAllPage(FilterPageDto input);
    }
}
