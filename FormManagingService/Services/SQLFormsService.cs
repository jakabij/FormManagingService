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

            //add 0 value to user_id because that means that the form has not been send to anyone
            command.CommandText = $"INSERT INTO forms (admin_id) VALUES" +
                $"('{adminID}')";

            command.ExecuteNonQuery();
        }


        public int GetFormId(int adminID)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT form_id FROM forms WHERE form_is_not_sent_yet = true AND admin_id = {adminID}";

            using var reader = command.ExecuteReader();
            reader.Read();
            int formID = Convert.ToInt32(reader["form_id"]);
            return formID;
        }

        public void AddQuestion(string question, int adminID)
        {
            int formID = GetFormId(adminID);

            using var command = _connection.CreateCommand();        //form ID-t ide írniiiii

            command.CommandText = $"INSERT INTO questions (question_title, form_id) VALUES" +
                $"('{question}', {formID})";

            command.ExecuteNonQuery();
        }


        //public void UpdateFormWithUser()
        //{
        //    //int formID = GetFormId();

        //    //using var command = _connection.CreateCommand();        //form ID-t ide írniiiii

        //    //command.CommandText =$"";

        //    //command.ExecuteNonQuery();
        //}
    }
}
