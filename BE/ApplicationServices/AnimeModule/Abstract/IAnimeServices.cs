using ApiBasic.ApplicationServices.AnimeModule.Dtos;

namespace ApiBasic.ApplicationServices.AnimeModule.Abstract
{
    public interface IAnimeServices
    {
        void Create(CreateAnimeDto input);
        void Update (UpdateAnimeDto input);
        void Delete (int AnimeId);
    }
}
