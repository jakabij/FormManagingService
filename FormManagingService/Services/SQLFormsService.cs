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


        public void CreateForm(int adminID, string title)
        {
            using var command = _connection.CreateCommand();

            //add 0 value to user_id because that means that the form has not been send to anyone
            command.CommandText = $"INSERT INTO forms (admin_id, form_title) VALUES" +
                $"('{adminID}', '{title}')";

            command.ExecuteNonQuery();
        }


        public int GetFormId(int adminID)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT form_id FROM forms WHERE form_is_not_sent_yet = true AND admin_id = '{adminID}'";

            using var reader = command.ExecuteReader();
            reader.Read();
            int formID = Convert.ToInt32(reader["form_id"]);
            return formID;
        }

        public void AddQuestion(string question, int adminID)
        {
            int formID = GetFormId(adminID);

            using var command = _connection.CreateCommand();

            command.CommandText = $"INSERT INTO questions (question_title, form_id) VALUES ('{question}', '{formID}')";

            command.ExecuteNonQuery();
        }


        public int GetUserID(string email)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT user_id FROM users WHERE user_email LIKE '{email}'";

            try
            { 
                using var reader = command.ExecuteReader();
                reader.Read();
                int userID = Convert.ToInt32(reader["user_id"]);
                return userID;
            }
            catch
            {
                return -1;
            }
        }


        public void TickFormIsSent(int adminID, int formID)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"UPDATE forms SET form_is_not_sent_yet = false WHERE admin_id = '{adminID}' AND form_id = '{formID}'";

            command.ExecuteNonQuery();
            
        }

        public List<string> SendFormToUsers(List<string> emails, int adminID)
        {
            List<string> notFoundUsers = new List<string>();

            int formID = GetFormId(adminID);
            foreach (var email in emails)
            {
                int userID = GetUserID(email);

                if(userID != -1)
                {
                    using var command = _connection.CreateCommand();

                    command.CommandText = $"INSERT INTO users_forms_connect (user_id, form_id, admin_id) VALUES" +
                        $"('{userID}', '{formID}', '{adminID}')";

                    command.ExecuteNonQuery();
                }
                else
                {
                    notFoundUsers.Add(email);
                }
            }

            TickFormIsSent(adminID, formID);    //set the form's attribute to false. Alias the form making is completed.

            return notFoundUsers;
        }
    }
}
