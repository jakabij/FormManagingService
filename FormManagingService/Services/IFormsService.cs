using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Services
{
    public interface IFormsService
    {
        public void AddQuestion(string question, int adminID);
        public void CreateForm(int adminID, string title);
        public List<string> SendFormToUsers(List<string> emails, int adminID);
    }
}
