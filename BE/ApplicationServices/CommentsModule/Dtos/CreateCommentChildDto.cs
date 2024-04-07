namespace ApiBasic.ApplicationServices.CommentsModule.Dtos
{
    public class CreateCommentChildDto : CreateCommentDto
    {
        public int? ParentCommentId { get; set; }
    }
}
