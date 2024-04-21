using ApiBasic.ApplicationServices.AnimeModule.Abstract;
using ApiBasic.ApplicationServices.AnimeModule.Dtos;
using ApiBasic.Shared.Shared;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnimeController : ApiControllerBase
    {
        private readonly IAnimeServices _animeServices;

        public AnimeController(IAnimeServices animeServices, ILogger<AnimeController> logger)
            : base(logger)
        {
            _animeServices = animeServices;
        }

        [HttpPost("Create")]
        public IActionResult Create(CreateAnimeDto input)
        {
            try
            {
                _animeServices.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("delete/{AnimeId}")]
        public ActionResult Delete(int AnimeId)
        {
            try
            {
                _animeServices.Delete(AnimeId);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("update")]
        public ActionResult Update(UpdateAnimeDto input)
        {
            try
            {
                _animeServices.Update(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get")]
        public ActionResult Get(FilterDto input)
        {
            try
            {
                return Ok(_animeServices.Get(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get-anime-video")]
        public ActionResult GetAnimeVideo(int AnimeId)
        {
            try
            {
                return Ok(_animeServices.GetVideoAnime(AnimeId));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
