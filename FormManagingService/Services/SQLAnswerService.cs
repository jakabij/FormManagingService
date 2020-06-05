using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using FormManagingService.Models;

namespace FormManagingService.Services
{
    public class SQLAnswerService : IAnswerService
    {
        private readonly IDbConnection _connection;

        public SQLAnswerService(IDbConnection connection)
        {
            _connection = connection;
        }


        public AnswerModel GetAnswerForQuestion(int questionID, int userID, string questionText)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT * FROM answers WHERE question_id = {questionID}";

            using var reader = command.ExecuteReader();
            reader.Read();

            int answerID = Convert.ToInt32(reader["answer_id"]);
            string answerText = reader["answer_text"].ToString();

            return new AnswerModel(answerID, questionID, answerText, userID, questionText);
        }
        
        public List<AnswerModel> GetAllAnswerFOrQuestions(int formID, int userID)
        {
            List<AnswerModel> allAnswers = new List<AnswerModel>();
            SQLFormsService sQLFormsService = new SQLFormsService(_connection);

            var questions = sQLFormsService.GetallQuestionForForm(formID);
            foreach(var question in questions)
            {
                allAnswers.Add(GetAnswerForQuestion(question.QuestionID, userID, question.Title));
            }

            return allAnswers;
        }
    }
}
