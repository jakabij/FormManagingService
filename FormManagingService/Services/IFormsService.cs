using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FormManagingService.Models;

namespace FormManagingService.Services
{
    public interface IFormsService
    {
        public void AddQuestion(string question, int adminID);
        public void CreateForm(int adminID, string title);
        public List<string> SendFormToUsers(List<string> emails, int adminID);
        public List<QuestionModel> GetallQuestionForForm(int formID);
        public List<FormModel> GetAllFormsForAdmin(int adminID);
    }
}
