using System.Threading.Tasks;

namespace API.Features.Reservations {

    public interface IReservationSendToEmail {

        Task SendReservationToEmail(Reservation reservation);

    }

}