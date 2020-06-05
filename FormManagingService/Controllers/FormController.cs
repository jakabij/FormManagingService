using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FormManagingService.Services;
using FormManagingService.Models;

namespace FormManagingService.Controllers
{
    public class FormController : Controller
    {
        private readonly IFormsService _sqlFormService;
       
        public FormController(IFormsService formsService)
        {
            _sqlFormService = formsService;
        }

        public IActionResult Index()
        {
            return View();
        }


        public ActionResult AddForm()
        {
            int adminID = Convert.ToInt32(Request.Form["adminID"]);
            string formTitle = Request.Form["questionTitle"];
            _sqlFormService.CreateForm(adminID, formTitle);

            int questionCount = Convert.ToInt32(Request.Form["questionCount"]);
            List<string> questions = new List<string>();

            for(int count = 0; count < questionCount; count++)
            {
                string questionID = "question" + count;
                string questionText = Request.Form[questionID];

                questions.Add(questionText);
                _sqlFormService.AddQuestion(questionText, adminID);
            }

            return Json("Success");
        }


        public ActionResult AddUsersToForm()
        {
            int adminID = Convert.ToInt32(Request.Form["adminID"]);
            int emailCount = Convert.ToInt32(Request.Form["emailCount"]);
            List<string> userEmails = new List<string>();
            for(int count = 0; count < emailCount; count++)
            {
                string dataElementName = "email" + (count + 1);
                userEmails.Add(Request.Form[dataElementName]);
            }

            List<string> notFoundUsers = _sqlFormService.SendFormToUsers(userEmails, adminID);

            return Json(notFoundUsers);
        }


        public ActionResult SentForms()
        {
            int adminID = Convert.ToInt32(Request.Form["adminID"]);
            List<FormModel> userForms = _sqlFormService.GetAllFormsForAdmin(adminID);

            foreach (var form in userForms)
            {
                form.questionList = _sqlFormService.GetallQuestionForForm(form.FormID);
            }

            return Json(userForms);
        }
    }
}