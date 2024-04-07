using ApiBasic.Domain;

namespace ApiBasic.ApplicationServices.CommentsModule.Dtos
{
    public class CommentDto
    {
        public int CommentId { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }

        public int VideoId { get; set; }

        public int? ParentCommentId { get; set; }

        public int UserId { get; set; }
    }
}
