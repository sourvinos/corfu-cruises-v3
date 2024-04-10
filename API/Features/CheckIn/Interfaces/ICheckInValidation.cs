using API.Features.Reservations.Reservations;

namespace API.Features.CheckIn {

    public interface ICheckInValidation {

        int IsValid(Reservation reservation);

    }

}