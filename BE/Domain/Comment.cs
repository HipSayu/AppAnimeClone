namespace ApiBasic.Domain
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }

        // Khóa ngoại liên kết đến Video
        public int VideoId { get; set; }
        public Video Video { get; set; }

        // Khóa ngoại liên kết đến Comment cha (nếu có)
        public int? ParentCommentId { get; set; }
        public Comment? ParentComment { get; set; }

        // Khóa ngoại liên kết đến User
        public int UserId { get; set; }
        public User User { get; set; }

        // Danh sách các comment con (nếu có)
        public ICollection<Comment>? ChildComments { get; set; }
    }
}
