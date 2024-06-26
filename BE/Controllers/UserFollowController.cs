﻿using ApiBasic.ApplicationServices.UserFollowModule.Abstract;
using ApiBasic.ApplicationServices.UserFollowModule.Dtos;
using ApiWebBasicPlatFrom.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiBasic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFollowController : ApiControllerBase
    {
        private readonly IUserFollowServices _userFollowService;

        public UserFollowController(
            IUserFollowServices userFollowService,
            ILogger<UserFollowController> logger
        )
            : base(logger)
        {
            _userFollowService = userFollowService;
        }
        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(CreateUserFollowDto input)
        {
            try
            {
                _userFollowService.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("delete/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _userFollowService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
        [Authorize]
        [HttpDelete("Unfollow")]
        public ActionResult Delete([FromQuery] UnFollowDtto input)
        {
            try
            {
                _userFollowService.Unfollow(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("CheckIsFollow")]
        public ActionResult CheckIsFollow([FromQuery] CreateUserFollowDto input)
        {
            try
            {
                return Ok(_userFollowService.CheckFollow(input));
               
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
