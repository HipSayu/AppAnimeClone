using ApiBasic.Shared.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ApiBasic.Shared.Utils
{
    public class CommonUtils
    {
        public static string CreateMD5(string input)
        {
            MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.ASCII.GetBytes(input);
            byte[] hashBytes = md5.ComputeHash(inputBytes);
            return Convert.ToHexString(hashBytes);
        }
        public static int GetCurrentUserId(IHttpContextAccessor httpContextAccessor)
        {
            var claims = httpContextAccessor.HttpContext?.User?.Identity as ClaimsIdentity;
            //nếu trong program dùng JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            //thì các claim type sẽ không bị ghi đè tên nên phải dùng trực tiếp "sub"
            var claim = claims?.FindFirst(JwtRegisteredClaimNames.Sub) ?? claims?.FindFirst("sub");
            if (claim == null)
            {
                throw new UserFriendlyExceptions($"Tài khoản không chứa claim \"{ClaimTypes.NameIdentifier}\"");
            }
            int userId = int.Parse(claim.Value);
            return userId;
        }
    }
}