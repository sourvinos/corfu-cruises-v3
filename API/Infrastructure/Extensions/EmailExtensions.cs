using API.Infrastructure.Implementations;
using API.Infrastructure.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class Email {

        public static IServiceCollection AddEmailSenders(this IServiceCollection services) {

            services.AddTransient<IEmailSender, EmailSender>();

            return services;

        }

    }

}