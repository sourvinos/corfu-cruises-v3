using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;

namespace API.Features.Users {

    public class UserRepository : IUserRepository {

        #region variables

        private readonly AppDbContext context;
        private readonly IMapper mapper;
        private readonly TestingEnvironment testingSettings;
        private readonly UserManager<UserExtended> userManager;

        #endregion

        public UserRepository(AppDbContext context, IMapper mapper, IOptions<TestingEnvironment> testingSettings, UserManager<UserExtended> userManager) {
            this.context = context;
            this.mapper = mapper;
            this.userManager = userManager;
            this.testingSettings = testingSettings.Value;
        }

        public async Task<IEnumerable<UserListVM>> GetAsync() {
            var users = await userManager.Users
                .AsNoTracking()
                .OrderBy(o => o.UserName)
                .ToListAsync();
            return mapper.Map<IEnumerable<UserExtended>, IEnumerable<UserListVM>>(users);
        }

        public async Task<UserExtended> GetByIdAsync(string id) {
            return await userManager.Users
                .Include(x => x.Customer)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task CreateAsync(UserExtended entity, string password) {
            using var transaction = context.Database.BeginTransaction();
            var result = await userManager.CreateAsync(entity, password);
            if (result.Succeeded) {
                await userManager.AddToRoleAsync(entity, entity.IsAdmin ? "Admin" : "User");
                DisposeOrCommit(transaction);
            } else {
                throw new CustomException() {
                    ResponseCode = 492
                };
            }
        }

        public async Task<bool> UpdateAdminAsync(UserExtended entity, UserUpdateDto entityToUpdate) {
            if (await UpdateUser(entity, entityToUpdate, "admin")) {
                await UpdateUserRole(entity);
                return true;
            } else {
                return false;
            }
        }

        public async Task<bool> UpdateSimpleUserAsync(UserExtended entity, UserUpdateDto entityToUpdate) {
            if (await UpdateUser(entity, entityToUpdate, "simpleUser")) {
                return true;
            } else {
                return false;
            }
        }

        public async Task<Response> DeleteAsync(UserExtended entity) {
            using var transaction = context.Database.BeginTransaction();
            try {
                var x = await userManager.DeleteAsync(await userManager.FindByIdAsync(entity.Id));
                if (x.Succeeded) {
                    DisposeOrCommit(transaction);
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = null,
                        Message = ApiMessages.OK()
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = 491
                    };
                }
            }
            catch (Exception) {
                throw new CustomException { ResponseCode = 491 };
            }
        }

        private async Task<bool> UpdateUser(UserExtended entity, UserUpdateDto entityToUpdate, string role) {
            entity.Displayname = entityToUpdate.Displayname;
            entity.IsFirstFieldFocused = entityToUpdate.IsFirstFieldFocused;
            if (role == "admin") {
                entity.CustomerId = entityToUpdate.CustomerId == 0 ? null : entityToUpdate.CustomerId;
                entity.UserName = entityToUpdate.Username;
                entity.Email = entityToUpdate.Email;
                entity.IsAdmin = entityToUpdate.IsAdmin;
                entity.IsActive = entityToUpdate.IsActive;
            }
            var result = await userManager.UpdateAsync(entity);
            return result.Succeeded;
        }

        private async Task UpdateUserRole(UserExtended entity) {
            var roles = await userManager.GetRolesAsync(entity);
            await userManager.RemoveFromRolesAsync(entity, roles);
            await userManager.AddToRoleAsync(entity, entity.IsAdmin ? "admin" : "user");

        }

        private void DisposeOrCommit(IDbContextTransaction transaction) {
            if (testingSettings.IsTesting) {
                transaction.Dispose();
            } else {
                transaction.Commit();
            }
        }

    }

}