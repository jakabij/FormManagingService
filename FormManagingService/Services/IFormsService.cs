using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Services
{
    public interface IFormsService
    {
        public void AddQuestion(string question, int adminID);
        public void CreateForm(int adminID);
        //public void UpdateFormWithUser();
    }
}
