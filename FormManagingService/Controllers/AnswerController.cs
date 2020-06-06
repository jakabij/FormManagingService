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


        public ActionResult AddAnswers()
        {
            //questionöket kigyűjteni egy Listába majd ezt összevetni index szerint a kapott Request.Form-al
            List<string> answerTexts = new List<string>();
            List<int> questionIDs = new List<int>();

            int answerLength = Convert.ToInt32(Request.Form["counter"]);
            for(int count = 0; count < answerLength; count++)
            {
                string answerID = "answer" + count;
                string[] dataWithoutConcat = Request.Form[answerID][0].Split(",");

                int answer = 0;
                int questionID = 1;
                answerTexts.Add(dataWithoutConcat[answer]);
                questionIDs.Add(Convert.ToInt32(dataWithoutConcat[questionID]));
            }

            int userID = Convert.ToInt32(Request.Form["userID"]);
            int formID = Convert.ToInt32(Request.Form["formID"]);

            _sqlAnswerService.AddAnswersToDatabase(answerTexts, questionIDs, userID, formID);
            return Json("Successfully sent your answers.");
        }
    }
}