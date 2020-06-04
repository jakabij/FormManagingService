using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FormManagingService.Services;

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
            _sqlFormService.CreateForm(adminID);

            int questionCount = Convert.ToInt32(Request.Form["questionCount"]);
            List<string> questions = new List<string>();

            for(int count = 0; count < questionCount; count++)
            {
                string questionID = "question" + count;
                string questionText = Request.Form[questionID];

                questions.Add(questionText);
                _sqlFormService.AddQuestion(questionText);
            }

            return Json("Success");
        }
    }
}