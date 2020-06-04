using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Services
{
    public interface IFormsService
    {
        public void AddQuestion(string question);
        public void CreateForm(int adminID);
    }
}
