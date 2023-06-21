using System.Threading.Tasks;

namespace API.Infrastructure.Interfaces {

    public interface IEmailSender {

        Task SendForgotPasswordEmail(string username, string displayname, string email, string callbackUrl, string language);

    }

}