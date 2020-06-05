using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using FormManagingService.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Data;
using Npgsql;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace FormManagingService
{
    public class Startup
    {
        private readonly string connectionString;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            connectionString = InitConnectionString();
        }

        public IConfiguration Configuration { get; }

        private string InitConnectionString()
        {
            string connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING") ??
                "Host=localhost;Username=postgres;Password=admin;Database=FormManagingService";
            return connectionString;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddScoped<ICyberSecurityProvider, PasswordEncrypter>();
            services.AddScoped<IDbConnection>(_ =>
            {
                var connection = new NpgsqlConnection(connectionString);
                connection.Open();
                return connection;
            });
            services.AddScoped<IUsersService, SQLUsersService>();
            services.AddScoped<IFormsService, SQLFormsService>();
            services.AddScoped<IUsersFormsConnectionController, SQLUsersFormsConnectionController>();



            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie
            (CookieAuthenticationDefaults.AuthenticationScheme, options =>
            {
                options.LoginPath = "/User/Login";
                options.LogoutPath = "/User/Logout";
            }
            );

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
               
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
