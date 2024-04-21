using ApiBasic.ApplicationServices.LoginModule.Dtos;

namespace ApiBasic.ApplicationServices.LoginModule.Abstract
{
    public interface ILoginServices
    {
        bool CheckSoDienThoai(string SDT);
        LoginUserDto Login(LoginDto input);
        LoginTokenDto LoginToken(LoginDto input);

    }
}
