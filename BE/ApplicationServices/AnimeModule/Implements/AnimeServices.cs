using ApiBasic.ApplicationServices.AnimeModule.Abstract;
using ApiBasic.ApplicationServices.AnimeModule.Dtos;
using ApiBasic.ApplicationServices.SearchModule.Dtos;
using ApiBasic.ApplicationServices.VideoModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;
using ApiBasic.Shared.Shared;
using Microsoft.EntityFrameworkCore;

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
                    AnimeUrl = input.AnimeUrl,
                    Age = input.Age,
                    AnimeId = input.AnimeId,
                    Detail = input.Detail,
                    NameAnime = input.NameAnime,
                    Quality = input.Quality,
                }
            );
            _dbcontext.SaveChanges();
        }

        public void Delete(int AnimeId)
        {
            var anime =
                _dbcontext.Animes.FirstOrDefault(v => v.Id == AnimeId)
                ?? throw new UserFriendlyExceptions("Anime không tìm thấy");
            _dbcontext.Remove(anime);
            _dbcontext.SaveChanges();
        }

        public PageResultDto<List<AnimeViewDto>> Get(FilterDto input)
        {
            var animes = _dbcontext
                .Animes.Where(a =>
                    a.Id > 1 && a.NameAnime.ToLower().Contains(input.Keyword.ToLower())
                )
                .Select(s => new AnimeViewDto
                {
                    Id = s.Id,
                    NameAnime = s.NameAnime,
                    Quality = s.Quality,
                    AnimeUrl = s.AnimeUrl
                });
            animes = animes.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            return new PageResultDto<List<AnimeViewDto>>
            {
                Items = animes.ToList(),
                TotalItem = animes.Count(),
            };
        }

        public AnimeWithVideoDto GetVideoAnime(int AnimeId)
        {
            var animes =
                _dbcontext.Animes.Include(a => a.videos).FirstOrDefault(a => a.Id == AnimeId)
                ?? throw new UserFriendlyExceptions("Anime không tìm thấy");
            var result = new AnimeWithVideoDto
            {
                Id = animes.Id,
                Age = animes.Age,
                AnimeVideos = animes
                    .videos.Select(a => new AnimeVideoDto
                    {
                        AvatarVideoUrl = a.AvatarVideoUrl,
                        IdVideo = a.Id,
                        NameVideos = a.NameVideos,
                        UrlVideo = a.UrlVideo,
                        ThoiDiemTao = a.ThoiDiemTao,
                        Time = a.Time
                    })
                    .ToList(),
                Detail = animes.Detail,
                NameAnime = animes.NameAnime,
                Quality = animes.Quality,
            };
            return result;
        }

        public void Update(UpdateAnimeDto input)
        {
            var anime =
                _dbcontext.Animes.FirstOrDefault(v => v.Id == input.Id)
                ?? throw new UserFriendlyExceptions("Anime không tìm thấy");
            anime.Age = input.Age;
            anime.Quality = input.Quality;
            anime.Detail = input.Detail;
            anime.AnimeUrl = input.AnimeUrl;
            anime.NameAnime = input.NameAnime;
            anime.AnimeId = input.AnimeId;
            _dbcontext.SaveChanges();
        }
    }
}
