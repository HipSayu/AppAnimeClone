using ApiBasic.ApplicationServices.AnimeModule.Abstract;
using ApiBasic.ApplicationServices.AnimeModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;

namespace ApiBasic.ApplicationServices.AnimeModule.Implements
{
    public class AnimeServices : IAnimeServices
    {
        private AnimeAppContext _dbcontext;

        public AnimeServices(AnimeAppContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void Create(CreateAnimeDto input)
        {
            _dbcontext.Animes.Add(
                new Anime
                {
                    Age = input.Age,
                    AnimeId = input.AnimeId,
                    Detail = input.Detail,
                    NameAnime = input.NameAnime,
                    Quality = input.Quality,
                }
            );
        }

        public void Delete(int AnimeId)
        {
            var anime =
                _dbcontext.Animes.FirstOrDefault(v => v.Id == AnimeId)
                ?? throw new UserFriendlyExceptions("Anime không tìm thấy");
            _dbcontext.Remove(anime);
            _dbcontext.SaveChanges();
        }

        public void Update(UpdateAnimeDto input)
        {
            var anime =
               _dbcontext.Animes.FirstOrDefault(v => v.Id == input.Id)
               ?? throw new UserFriendlyExceptions("Anime không tìm thấy");
            anime.Age = input.Age;
            anime.Quality = input.Quality;
            anime.Detail = input.Detail;
            anime.NameAnime = input.NameAnime;
            anime.AnimeId = input.AnimeId;
            _dbcontext.SaveChanges();
        }
    }
}
