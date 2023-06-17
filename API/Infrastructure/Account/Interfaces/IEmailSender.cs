using System.Threading.Tasks;

namespace API.Infrastructure.Account {

    public interface IEmailSender {

        Task SendResetPasswordEmail(string displayName, string email, string callbackUrl, string language, string company, string username, string phones);

    }

}