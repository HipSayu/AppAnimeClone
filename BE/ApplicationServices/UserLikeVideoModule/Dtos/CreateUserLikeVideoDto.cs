namespace ApiBasic.ApplicationServices.UserLikeVideoModule.Dtos
{
    public class CreateUserLikeVideoDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int VideoId { get; set; }
    }
}
