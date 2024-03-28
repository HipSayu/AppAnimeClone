using ApiBasic.ApplicationServices.SearchModule.Abstract;
using ApiBasic.ApplicationServices.SearchModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;
using ApiBasic.Shared.Filter;
using ApiBasic.Shared.Shared;

namespace ApiBasic.ApplicationServices.SearchModule.Implements
{
    public class SearchServices : ISearchServices
    {
        private AnimeAppContext _dbcontext;

        public SearchServices(AnimeAppContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void Create(CreateSearchDto input)
        {
            _dbcontext.Searchs.Add(
                new Search { SearchKeyWord = input.SearchKeyWord, UserId = input.UserId }
            );

            _dbcontext.SaveChanges();
        }

        public void Delete(int SearchId)
        {
            var search =
                _dbcontext.Searchs.FirstOrDefault(v => v.Id == SearchId)
                ?? throw new UserFriendlyExceptions("Video không tìm thấy");
            _dbcontext.Remove(search);
            _dbcontext.SaveChanges();
        }

        public PageResultDto<List<SearchDto>> GetAllPage(FilterPageDto input)
        {
            var searches = _dbcontext
                .Searchs.Where(s => s.UserId == input.UserId)
                .Select(s => new SearchDto { Id = s.Id, SearchKeyWord = s.SearchKeyWord, });
            searches = searches.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            return new PageResultDto<List<SearchDto>>
            {
                Items = searches.ToList(),
                TotalItem = searches.Count(),
            };
        }

        public PageResultDto<List<SearchDto>> GetAllSearch(SearchFilterDto input)
        {
            var searches = _dbcontext
                .Searchs.Where(s =>
                    s.UserId == input.UserId
                    && s.SearchKeyWord.ToLower().Contains(input.Keyword.ToLower())
                )
                .Select(s => new SearchDto { Id = s.Id, SearchKeyWord = s.SearchKeyWord, });
            searches = searches.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            return new PageResultDto<List<SearchDto>>
            {
                Items = searches.ToList(),
                TotalItem = searches.Count(),
            };
        }
    }
}
