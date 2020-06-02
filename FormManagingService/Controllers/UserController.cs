using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FormManagingService.Models;
using FormManagingService.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;

namespace FormManagingService.Controllers
{
    public class UserController : Controller
    {
        private readonly IUsersService _sqlUsersService;
        private readonly ICyberSecurityProvider _cyberSecurity;

        public UserController(IUsersService usersService, ICyberSecurityProvider cyberSecurity)
        {
            _sqlUsersService = usersService;
            _cyberSecurity = cyberSecurity;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register()
        {
            var name = Request.Form["username"];
            var email = Request.Form["email"];
            var password = _cyberSecurity.EncryptPassword(Request.Form["password"]);

            try
            {
                _sqlUsersService.AddUser(name, email, password);
            }
            catch (Npgsql.PostgresException)
            {
                return Json("You already registerd. Email address taken!");
            }

            return Json("Success!");
        }


        [HttpPost]
        public async Task<ActionResult> Login()
        {
            var email = Request.Form["email"];
            var password = Request.Form["password"];
            
            if (!_cyberSecurity.IsValidUser(email, password))
            {
                return Json(0);
            }

            var claims = new List<Claim> { new Claim(ClaimTypes.Name, email) };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties{ };


            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
            string userID = _sqlUsersService.GetUserId(email).ToString();
            string[] result = new string[] {email, userID , _sqlUsersService.UserIsAdmin(Convert.ToInt32(userID)).ToString() };
            return Json(result);
        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Json("Logged out");
        }
    }
}