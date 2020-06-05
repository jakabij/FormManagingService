using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Models
{
    public class QuestionModel
    {
        public int QuestionID { get; set; }
        public int FormID { get; set; }
        public string Title { get; set; }
       
        public QuestionModel(int questionID, int formID, string title)
        {
            QuestionID = questionID;
            FormID = formID;
            Title = title;
        }
    }
}
