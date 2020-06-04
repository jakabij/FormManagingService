using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Services
{
    public class SQLFormsService : IFormsService
    {
        private readonly IDbConnection _connection;

        public SQLFormsService(IDbConnection connection)
        {
            _connection = connection;
        }


        public void CreateForm(int adminID)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"INSERT INTO forms (admin_id, form_asked_user_id) VALUES" +
                $"('{adminID}', {0})";

            command.ExecuteNonQuery();
        }


        public int GetFormId()
        {
            using var command = _connection.CreateCommand();

            command.CommandText = "SELECT form_id FROM forms WHERE form_asked_user_id = 0";

            using var reader = command.ExecuteReader();
            reader.Read();
            int formID = Convert.ToInt32(reader["form_id"]);
            return formID;
        }

        public void AddQuestion(string question)
        {
            int formID = GetFormId();

            using var command = _connection.CreateCommand();        //form ID-t ide írniiiii

            command.CommandText = $"INSERT INTO questions (question_title, form_id) VALUES" +
                $"('{question}', {formID})";

            command.ExecuteNonQuery();
        }
    }
}
