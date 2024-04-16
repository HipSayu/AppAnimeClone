using ApiBasic.ApplicationServices.VideoModule.Abstract;
using ApiBasic.ApplicationServices.VideoModule.Dtos;
using ApiBasic.Shared.Shared;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("ApiCorsPolicy")]
    [ApiController]
    public class VideoController : ApiControllerBase
    {
        private readonly IVideoServices _iVideoServices;

        public VideoController(IVideoServices iVideoServices, ILogger<UserController> logger)
            : base(logger)
        {
            _iVideoServices = iVideoServices;
        }

        [HttpPost("create")]
        public ActionResult Create(CreateVideoDto input)
        {
            try
            {
                _iVideoServices.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get-all")]
        public ActionResult GetAll(FilterVideoDto input)
        {
            try
            {
                return Ok(_iVideoServices.GetAll(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("delete/{VideoId}")]
        public ActionResult Delete(int VideoId)
        {
            try
            {
                _iVideoServices.Delete(VideoId);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("update")]
        public ActionResult Update(UpdateVideoDto input)
        {
            try
            {
                _iVideoServices.Update(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get-video-by-idUser")]
        public ActionResult GetVideoByIdUser(FilterGetVideoById input)
        {
            try
            {
                return Ok(_iVideoServices.GetVideoByUserId(input));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get-video-by-id/{IdVideo}")]
        public ActionResult GetById(int IdVideo)
        {
            try
            {
                return Ok(_iVideoServices.GetById(IdVideo));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get-video-with-comment/{IdVideo}")]
        public ActionResult GetVideoWithComments(int IdVideo)
        {
            try
            {
                return Ok(_iVideoServices.GetVideoWithCommentsById(IdVideo));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("get-like-video-by-idVideo/{IdVideo}")]
        public ActionResult GetLikeVideoById(int IdVideo)
        {
            try
            {
                return Ok(_iVideoServices.GetLikeVideoByIdVideos(IdVideo));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
