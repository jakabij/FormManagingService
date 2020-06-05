using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FormManagingService.Services;
using FormManagingService.Models;

namespace FormManagingService.Controllers
{
    public class UsersFormsConnectionController : Controller
    {
        private readonly IUsersFormsConnectionController _sqlFormsUsersService;
        private readonly ICyberSecurityProvider _cyberSecurity;

        public UsersFormsConnectionController(IUsersFormsConnectionController formsUsersService, ICyberSecurityProvider cyberSecurity)
        {
            _sqlFormsUsersService = formsUsersService;
            _cyberSecurity = cyberSecurity;
        }

        public IActionResult Index()
        {
            return View();
        }


        public ActionResult GetUsers()
        {
            int formID = Convert.ToInt32(Request.Form["formID"]);
            List<UserModel> users = _sqlFormsUsersService.GetUserWhoGotTheForm(formID);

            return Json(users);
        }
    }
}