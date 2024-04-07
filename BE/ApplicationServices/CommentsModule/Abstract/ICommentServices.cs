using ApiBasic.ApplicationServices.CommentsModule.Dtos;

namespace ApiBasic.ApplicationServices.CommentsModule.Abstract
{
    public interface ICommentServices
    {
        void Create(CreateCommentDto input);
        void CreateCommentChild (CreateCommentChildDto input);
    }
}
