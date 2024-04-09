using ApiBasic.ApplicationServices.AnimeModule.Dtos;
using ApiBasic.Shared.Shared;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ApiBasic.ApplicationServices.AnimeModule.Abstract
{
    public interface IAnimeServices
    {
        void Create(CreateAnimeDto input);
        void Update(UpdateAnimeDto input);
        void Delete(int AnimeId);
        PageResultDto<List<AnimeViewDto>> Get(FilterDto input);
        AnimeWithVideoDto GetVideoAnime (int AnimeId);
    }
}
