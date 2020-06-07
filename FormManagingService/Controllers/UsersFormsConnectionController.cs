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

        public ActionResult AppendEmails()
        {
            List<string> userEmails = new List<string>();
            List<string> wrongEmails = new List<string>();
            int counter = Convert.ToInt32(Request.Form["counter"]);
            int formID = Convert.ToInt32(Request.Form["formID"]);
            int adminID = Convert.ToInt32(Request.Form["adminID"]);


            for (int i = 0; i < counter; i++)
            {
                string dataID = "moreEmail" + i;
                Console.WriteLine(Request.Form[dataID].ToString());
                userEmails.Add(Request.Form[dataID].ToString());
            }

            foreach(var email in userEmails)
            {
                string result =_sqlFormsUsersService.SendFormToUsers(email, adminID, formID);
                if (result != null)
                    wrongEmails.Add(result);
            }

             return Json(wrongEmails);
        }
    }
}