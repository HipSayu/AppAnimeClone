namespace ApiBasic.ApplicationServices.CommentsModule.Dtos
{
    public class GetCommentDto
    {
        public int CommentId { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int VideoId { get; set; }
        public int UserId { get; set; }
        public List<GetCommentChildDto>? CommentChilds { get; set; }
        public string UserName { get; set; } = null!;

        public string AvatarUrl { get; set; }
    }
}
