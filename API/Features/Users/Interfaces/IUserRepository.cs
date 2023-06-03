using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Responses;

namespace API.Features.Users {

    public interface IUserRepository {

        Task<IEnumerable<UserListVM>> GetAsync();
        Task<UserExtended> GetByIdAsync(string id);
        Task CreateAsync(UserExtended entity, string password);
        Task<bool> UpdateAdminAsync(UserExtended entity, UserUpdateDto userToUpdate);
        Task<bool> UpdateSimpleUserAsync(UserExtended entity, UserUpdateDto userToUpdate);
        Task<Response> DeleteAsync(UserExtended entity);

    }

}