﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Models
{
    public class FormModel
    {
        public int FormID { get; set; }
        public int AdminID { get; set; }
        public string Title { get; set; }

        public List<QuestionModel> questionList { get; set; }
        public bool IsFilledOut { get; set; }


        public FormModel(int formID, int adminID, string title)
        {
            FormID = formID;
            AdminID = adminID;
            Title = title;
            questionList = new List<QuestionModel>();
        }

        public FormModel(int formID, int adminID, string title, bool isFilledOut)
        {
            FormID = formID;
            AdminID = adminID;
            Title = title;
            questionList = new List<QuestionModel>();
            IsFilledOut = isFilledOut;
        }
    }
}
