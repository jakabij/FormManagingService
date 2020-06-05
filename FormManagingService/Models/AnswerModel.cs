using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Models
{
    public class AnswerModel
    {
        public int AnswerID { get; set; }
        public int QuestionID { get; set; }
        public string AnswerText { get; set; }
        public int UserID { get; set; }
        public string QuestionText { get; set; }

        public AnswerModel(int answerID, int questionID, string answerText, int userID, string questionText)
        {
            AnswerID = answerID;
            QuestionID = questionID;
            AnswerText = answerText;
            UserID = userID;
            QuestionText = questionText;
        }
    }
}
