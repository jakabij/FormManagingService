using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FormManagingService.Models;

namespace FormManagingService.Services
{
    public interface IAnswerService
    {
        public List<AnswerModel> GetAllAnswerFOrQuestions(int formID, int userID);
        public AnswerModel GetAnswerForQuestion(int questionID, int userID);
    }
}
