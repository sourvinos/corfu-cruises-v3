using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using API.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Security.Claims;
using System;

namespace API.Infrastructure.Extensions {

    public static class Identity {

        public static void AddIdentity(IServiceCollection services) {
            services
                .AddIdentity<UserExtended, IdentityRole>(options => {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 1;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                    options.User.RequireUniqueEmail = true;
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                    options.Lockout.MaxFailedAccessAttempts = 5;
                    options.Lockout.AllowedForNewUsers = true;
                })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
        }

        public static string GetConnectedUserId(IHttpContextAccessor httpContextAccessor) {
            return httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        public static UserExtended GetConnectedUserDetails(UserManager<UserExtended> userManager, string userId) {
            return userManager.Users.SingleOrDefault(x => x.Id == userId);
        }

        public static bool IsUserAdmin(IHttpContextAccessor httpContextAccessor) {
            try {
                return httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Role).Value == "admin";
            }
            catch (Exception) {
                return false;
            }
        }

        public static T PatchEntityWithUserAndDate<T>(IHttpContextAccessor httpContextAccessor, string existingPostAt, string existingUserId, T entity) where T : IMetadataWrite {
            if (entity.Id == 0) {
                entity.PostAt = DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime());
                entity.PostUserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return entity;
            } else {
                entity.PostAt = existingPostAt;
                entity.PostUserId = existingUserId;
                entity.PutAt = DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime());
                entity.PutUserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return entity;
            }
        }

    }

}