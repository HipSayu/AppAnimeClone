using ApiBasic.ApplicationServices.CommentsModule.Abstract;
using ApiBasic.ApplicationServices.CommentsModule.Dtos;
using ApiBasic.Domain;
using ApiBasic.Infrastructure;

namespace ApiBasic.ApplicationServices.CommentsModule.Implements
{
    public class CommentService : ICommentServices
    {
        private AnimeAppContext _dbcontext;

        public CommentService(AnimeAppContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void Create(CreateCommentDto input)
        {
            _dbcontext.Comments.Add(
                new Comment
                {
                    Text = input.Text,
                    Date = DateTime.Now,
                    UserId = input.UserId,
                    VideoId = input.VideoId,
                }
            );
            _dbcontext.SaveChanges();
        }

        public void CreateCommentChild(CreateCommentChildDto input)
        {
            _dbcontext.Comments.Add(
                new Comment
                {
                    Text = input.Text,
                    Date = DateTime.Now,
                    UserId = input.UserId,
                    VideoId = input.VideoId,
                    ParentCommentId = input.ParentCommentId,
                    
                }
            );
            _dbcontext.SaveChanges();
        }
    }
}
