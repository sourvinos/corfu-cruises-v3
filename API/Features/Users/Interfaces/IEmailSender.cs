using System.Threading.Tasks;

namespace API.Features.Users {

    public interface IEmailSender {

        Task EmailNewUserDetails(NewUserDetailsVM model);

    }

}