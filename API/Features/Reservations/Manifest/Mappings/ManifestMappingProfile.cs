using System.Linq;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Reservations.Manifest {

    public class ManifestMappingProfile : Profile {

        public ManifestMappingProfile() {
            CreateMap<ManifestVM, ManifestFinalVM>()
                .ForMember(x => x.Passengers, x => x.MapFrom(source => source.Passengers.Select(passenger => new ManifestFinalPassengerVM {
                    Id = passenger.Id,
                    Lastname = passenger.Lastname.Trim().ToUpper(),
                    Firstname = passenger.Firstname.Trim().ToUpper(),
                    Birthdate = DateHelpers.DateToISOString(passenger.Birthdate),
                    Phones = passenger.Reservation.Phones.Trim(),
                    Remarks = passenger.Remarks.Trim(),
                    SpecialCare = passenger.SpecialCare.Trim(),
                    Gender = new SimpleEntity { Id = passenger.Gender.Id, Description = passenger.Gender.Description },
                    Nationality = new ManifestFinalNationalityVM { Id = passenger.Nationality.Id, Code = passenger.Nationality.Code.ToUpper(), Description = passenger.Nationality.Description },
                    Occupant = new SimpleEntity { Id = passenger.Occupant.Id, Description = passenger.Occupant.Description },
                    Port = new SimpleEntity { Id = passenger.Reservation.Port.Id, Description = passenger.Reservation.Port.Locode },
                    Specialty = new SimpleEntity { Id = 0, Description = "" }
                }).OrderBy(x => x.Lastname).ThenBy(x => x.Firstname).ThenBy(x => x.Birthdate)));
        }

    }

}