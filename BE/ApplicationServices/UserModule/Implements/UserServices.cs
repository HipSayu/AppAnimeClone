﻿using ApiBasic.ApplicationServices.UserModule.Abstract;
using ApiBasic.ApplicationServices.UserModule.Dtos;
using ApiBasic.ApplicationServices.VideoModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;
using ApiBasic.Shared.Exceptions;
using ApiBasic.Shared.Shared;
using ApiBasic.Shared.Utils;
using Microsoft.EntityFrameworkCore;

namespace ApiBasic.ApplicationServices.UserModule.Implements
{
    public class UserServices : IUserServices
    {
        private AnimeAppContext _dbcontext;

        public UserServices(AnimeAppContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void Create(CreateUserDto input)
        {
            if (_dbcontext.Users.Any(u => u.SĐT.Equals(input.SĐT)))
            {
                throw new UserFriendlyExceptions("Số điện thoại đã tồn tại");
            }
            if (_dbcontext.Users.Any(u => u.UserName.Equals(input.UserName)))
            {
                throw new UserFriendlyExceptions("UserName đã tồn tại");
            }
            _dbcontext.Add(
                new User
                {
                    UserName = input.UserName,
                    Password = CommonUtils.CreateMD5(input.Password),
                    SĐT = input.SĐT,
                    AvatarUrl = "http://localhost:5179/api/File/GetImage/avatarDefault.jpg",
                    BackgroundUrl =
                        "http://localhost:5179/api/File/GetImage/kurrumi.jpg_638472133676158469.jpg",
                    TieuSu = input.TieuSu,
                    UserType = 1,
                }
            );
            _dbcontext.SaveChanges();
        }

        public void Delete(int UserId)
        {
            var user =
                _dbcontext.Users.FirstOrDefault(u => u.Id == UserId)
                ?? throw new UserFriendlyExceptions("User không tìm thấy");
            _dbcontext.Remove(user);
            _dbcontext.SaveChanges();
        }

        public FindUserDto FindById(int UserId)
        {
            var users = _dbcontext
                .Users.Include(u => u.Followers)
                .ThenInclude(u => u.Following)
                .ThenInclude(u => u.Videos)
                .Where(u => u.Id == UserId)
                .Select(e => new FindUserDto
                {
                    Id=e.Id,
                    UserName = e.UserName,
                    AvatarUrl = e.AvatarUrl,
                    BackgroundUrl = e.BackgroundUrl,
                    SĐT = e.SĐT,
                    TieuSu = e.TieuSu,
                    Follower = e.Following.Count(),
                    Following = e.Followers.Count(),
                    Videos = e.Videos.Count(),
                });
            return users.FirstOrDefault() ?? throw new UserFriendlyExceptions("Không tồn tại User");
        }

        public PageResultDto<List<FindUserDto>> GetAll(FilterDto input)
        {
            var users = _dbcontext
                .Users.Include(u => u.Followers)
                .ThenInclude(u => u.Following)
                .ThenInclude(u => u.Videos)
                .Where(u => u.TieuSu.ToLower().Contains(input.Keyword.ToLower()))
                .Select(e => new FindUserDto
                {
                    Id = e.Id,
                    UserName = e.UserName,
                    AvatarUrl = e.AvatarUrl,
                    BackgroundUrl = e.BackgroundUrl,
                    SĐT = e.SĐT,
                    TieuSu = e.TieuSu,
                    Follower = e.Following.Count(),
                    Following = e.Followers.Count(),
                    Videos = e.Videos.Count(),
                });
            users = users.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);
            return new PageResultDto<List<FindUserDto>>
            {
                Items = users.ToList(),
                TotalItem = users.Count(),
            };
        }

        public PageResultDto<List<UserFollowDto>> GetAllUserFollow(FilterUserFollowDto input)
        {
            var usersFollowingIdS =
                from u in _dbcontext.Users
                join userFollowing in _dbcontext.UserFollows on u.Id equals userFollowing.FollowerId
                where u.Id == input.UserId && userFollowing.FollowingId != 1
                select new { usersFollowingId = userFollowing.FollowingId };

            var users =
                from user in _dbcontext.Users
                join usersFollowingId in usersFollowingIdS
                    on user.Id equals usersFollowingId.usersFollowingId
                select user;

            var result = new List<UserFollowDto>();

            foreach (var user in users)
            {
                var videos = _dbcontext
                    .Videos.Where(v => v.UserId == user.Id)
                    .Select(v => new GetVideoByUserId
                    {
                        AvatarVideoUrl = v.AvatarVideoUrl,
                        Id = v.Id,
                        IdUserCreateVideo = v.UserId,
                        NameVideos = v.NameVideos,
                        Time = v.Time,
                        UrlVideo = v.UrlVideo,
                        dayAgo = (DateTime.Now - v.ThoiDiemTao).Days,
                    })
                    .Skip(input.PageSize * (input.PageIndex - 1))
                    .Take(input.PageSize);
                if (videos != null)
                {
                    result.Add(
                        new UserFollowDto
                        {
                            AvatarUrl = user.AvatarUrl,
                            UserFollowId = user.Id,
                            UserName = user.TieuSu,
                            VideoUserFollow = videos.ToList(),
                        }
                    );
                }
            }
            return new PageResultDto<List<UserFollowDto>>
            {
                Items = result.ToList(),
                TotalItem = result.Count(),
            };
        }

        public PageResultDto<List<UserFollowDto>> GetAllUserFollowHomePage(
            FilterUserFollowHomeDto input
        )
        {
            var usersFollowingIdS =
                from u in _dbcontext.Users
                join userFollowing in _dbcontext.UserFollows on u.Id equals userFollowing.FollowerId
                where u.SĐT == input.NumberPhone && userFollowing.FollowingId != 1
                select new { usersFollowingId = userFollowing.FollowingId };

            var users =
                from user in _dbcontext.Users
                join usersFollowingId in usersFollowingIdS
                    on user.Id equals usersFollowingId.usersFollowingId
                select user;

            var result = new List<UserFollowDto>();

            foreach (var user in users)
            {
                var videos = _dbcontext
                    .Videos.Where(v => v.UserId == user.Id)
                    .Select(v => new GetVideoByUserId
                    {
                        AvatarVideoUrl = v.AvatarVideoUrl,
                        Id = v.Id,
                        IdUserCreateVideo = v.UserId,
                        NameVideos = v.NameVideos,
                        Time = v.Time,
                        UrlVideo = v.UrlVideo,
                        dayAgo = (DateTime.Now - v.ThoiDiemTao).Days,
                    })
                    .Skip(input.PageSize * (input.PageIndex - 1))
                    .Take(input.PageSize);
                if (videos != null)
                {
                    result.Add(
                        new UserFollowDto
                        {
                            AvatarUrl = user.AvatarUrl,
                            UserFollowId = user.Id,
                            UserName = user.TieuSu,

                            VideoUserFollow = videos.ToList(),
                        }
                    );
                }
            }
            return new PageResultDto<List<UserFollowDto>>
            {
                Items = result.ToList(),
                TotalItem = result.Count(),
            };
        }

        public PageResultDto<List<UserNotFollowDto>> GetAllUserNotFollow(FilterUserFollowDto input)
        {
            var userfollow = _dbcontext.UserFollows;
            var user = _dbcontext
                .Users.Where(u =>
                    !userfollow.Any(uf => uf.FollowingId == u.Id && uf.FollowerId == input.UserId)
                    && u.Id != input.UserId
                )
                .Select(u => new UserNotFollowDto
                {
                    AvatarUrl = u.AvatarUrl,
                    UserFollowId = u.Id,
                    UserName = u.TieuSu
                })
                .Skip(input.PageSize * (input.PageIndex - 1))
                .Take(input.PageSize);

            return new PageResultDto<List<UserNotFollowDto>>
            {
                Items = user.ToList(),
                TotalItem = user.Count(),
            };
        }

        public PageResultDto<List<UserNotFollowDto>> GetAllUserNotFollowHomePage(
            FilterUserFollowHomeDto input
        )
        {
            int userId = _dbcontext.Users.FirstOrDefault(s => s.SĐT == input.NumberPhone).Id;
            var userfollow = _dbcontext.UserFollows;
            var user = _dbcontext
                .Users.Where(u =>
                    !userfollow.Any(uf => uf.FollowingId == u.Id && uf.FollowerId == userId)
                    && u.Id != userId
                )
                .Select(u => new UserNotFollowDto
                {
                    AvatarUrl = u.AvatarUrl,
                    UserFollowId = u.Id,
                    UserName = u.UserName
                })
                .Skip(input.PageSize * (input.PageIndex - 1))
                .Take(input.PageSize);

            return new PageResultDto<List<UserNotFollowDto>>
            {
                Items = user.ToList(),
                TotalItem = user.Count(),
            };
        }

        public UserWithVideoDto GetUserWithVideoById(int UserId)
        {
            var result =
                _dbcontext
                    .Users.Include(u => u.Followers)
                    .ThenInclude(u => u.Following)
                    .ThenInclude(u => u.Videos)
                    .Select(u => new UserWithVideoDto
                    {
                        Id = u.Id,
                        AvatarUrl = u.AvatarUrl,
                        TieuSu = u.TieuSu,
                        BackgroundUrl = u.BackgroundUrl,
                        UserName = u.UserName,
                        Follower = u.Following.Count(),
                        Following = u.Followers.Count(),
                        VideoUserFollow = u
                            .Videos.Select(v => new GetVideoByUserId
                            {
                                AvatarVideoUrl = v.AvatarVideoUrl,
                                NameVideos = v.NameVideos,
                                Id = v.Id,
                                IdUserCreateVideo = u.Id,
                                Time = v.Time,
                                UrlVideo = v.UrlVideo,
                                dayAgo = (DateTime.Now - v.ThoiDiemTao).Days
                            })
                            .ToList(),
                    })
                    .FirstOrDefault(u => u.Id == UserId)
                ?? throw new UserFriendlyExceptions("User không tìm thấy");
            return result;
        }

        public void Update(UpdateUserDto input)
        {
            var user =
                _dbcontext.Users.FirstOrDefault(u => u.Id == input.UserId)
                ?? throw new UserFriendlyExceptions("User không tìm thấy");
            if (input.UserName != "")
            {
                user.UserName = input.UserName;
            }
            if (input.AvatarUrl != "")
            {
                user.AvatarUrl = input.AvatarUrl;
            }

            if (input.BackgroundUrl != "")
            {
                user.BackgroundUrl = input.BackgroundUrl;
            }

            if (input.TieuSu != "")
            {
                user.TieuSu = input.TieuSu;
            }

            if (input.Password != "")
            {
                user.Password = CommonUtils.CreateMD5(input.Password);
            }

            _dbcontext.SaveChanges();
        }
    }
}
