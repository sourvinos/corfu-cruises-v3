using System;
using System.Collections.Generic;
using System.Security.Claims;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Interfaces;
using API.Infrastructure.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;

namespace API.Infrastructure.Implementations {

    public class Repository<T> : IRepository<T> where T : class {

        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly TestingEnvironment testingSettings;
        protected readonly AppDbContext context;
        private readonly UserManager<UserExtended> userManager;

        public Repository(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingSettings, UserManager<UserExtended> userManager) {
            this.context = context;
            this.httpContextAccessor = httpContext;
            this.testingSettings = testingSettings.Value;
            this.userManager = userManager;
        }

        public T Create(T entity) {
            using var transaction = context.Database.BeginTransaction();
            context.Add(entity);
            context.SaveChanges();
            DisposeOrCommit(transaction);
            return entity;
        }

        public void CreateList(List<T> entities) {
            using var transaction = context.Database.BeginTransaction();
            context.AddRange(entities);
            context.SaveChanges();
            DisposeOrCommit(transaction);
        }

        public void Update(T entity) {
            using var transaction = context.Database.BeginTransaction();
            context.Set<T>().Update(entity);
            context.SaveChanges();
            DisposeOrCommit(transaction);
        }

        public void Delete(T entity) {
            using var transaction = context.Database.BeginTransaction();
            try {
                context.Remove(entity);
                context.SaveChanges();
                DisposeOrCommit(transaction);
            }
            catch (Exception) {
                throw new CustomException {
                    ResponseCode = 491
                };
            }
        }

        public void DeleteRange(IEnumerable<T> entities) {
            context.RemoveRange(entities);
        }

        public IMetadataWrite AttachMetadataToDto(string existingPostAt, string existingPostUser, IMetadataWrite entity) {
            if (entity.Id == 0) {
                entity.PostAt = DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime());
                entity.PostUser = Identity.GetConnectedUserDetails(userManager, Identity.GetConnectedUserId(httpContextAccessor)).UserName;
                return entity;
            } else {
                entity.PostAt = existingPostAt;
                entity.PostUser = existingPostUser;
                entity.PutAt = DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime());
                entity.PutUser = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return entity;
            }

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