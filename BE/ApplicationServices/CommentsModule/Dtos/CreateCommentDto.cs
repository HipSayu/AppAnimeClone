namespace ApiBasic.ApplicationServices.CommentsModule.Dtos
{
    public class CreateCommentDto
    {
        public string Text { get; set; }

        // Khóa ngoại liên kết đến Video
        public int VideoId { get; set; }

        // Khóa ngoại liên kết đến Comment cha (nếu có)
       

        public int UserId { get; set; }
    }
}
