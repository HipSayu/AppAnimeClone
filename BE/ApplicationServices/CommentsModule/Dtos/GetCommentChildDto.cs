namespace ApiBasic.ApplicationServices.CommentsModule.Dtos
{
    public class GetCommentChildDto
    {
        public int CommentId { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int ParentCommentId { get; set; }
        public string UserName { get; set; } = null!;

        public string AvatarUrl { get; set; }
        public int UserId { get; set; }
    }
}
