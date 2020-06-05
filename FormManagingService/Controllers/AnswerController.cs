using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FormManagingService.Services;

namespace FormManagingService.Controllers
{
    public class AnswerController : Controller
    {
        private readonly IAnswerService _sqlAnswerService;
        private readonly ICyberSecurityProvider _cyberSecurity;

        public AnswerController(IAnswerService answerService, ICyberSecurityProvider cyberSecurity)
        {
            _sqlAnswerService = answerService;
            _cyberSecurity = cyberSecurity;
        }
        public IActionResult Index()
        {
            return View();
        }


        public ActionResult getAnswersForQuestionsFromOneUser()
        {
            int userID = Convert.ToInt32(Request.Form["userID"]);
            int formID = Convert.ToInt32(Request.Form["formID"]);

            var answers = _sqlAnswerService.GetAllAnswerFOrQuestions(formID, userID);
            return Json(answers);
        }
    }
}