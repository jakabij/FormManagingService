using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using FormManagingService.Models;

namespace FormManagingService.Services
{
    public class SQLUsersFormsConnectionController : IUsersFormsConnectionController
    {
        private readonly IDbConnection _connection;

        public SQLUsersFormsConnectionController(IDbConnection connection)
        {
            _connection = connection;
        }


        public bool GetUserFilledTheForm(int userId, int formID)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT form_is_filled FROM users_forms_connect WHERE form_id = {formID} AND user_id = {userId}";

            using var reader = command.ExecuteReader();
            reader.Read();

            return Convert.ToBoolean(reader["form_is_filled"]);
        }


        public UserModel GetUserById(int userId, int formID)
        {
            bool formIsFilled = GetUserFilledTheForm(userId, formID);

            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT user_name, user_email FROM users WHERE user_id = {userId}";

            using var reader = command.ExecuteReader();
            reader.Read();

            return new UserModel(userId, reader["user_email"].ToString(), reader["user_name"].ToString(), formIsFilled);
        }


        public List<int> GetUserIdsWhoGotTheForm(int formID)
        {
            List<int> userIds = new List<int>();
            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT user_id FROM users_forms_connect WHERE form_id = {formID}";

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                userIds.Add(Convert.ToInt32(reader["user_id"]));
            }

            return userIds;
        }
        
        public List<UserModel> GetUserWhoGotTheForm(int formID)
        {
            List<UserModel> users = new List<UserModel>();

            List<int> userIds = GetUserIdsWhoGotTheForm(formID);
            
            foreach(var userId in userIds)
            {
                users.Add(GetUserById(userId, formID));
            }

            return users;
        }


        public List<int> GetFormIdsForUser(int userID)
        {
            List<int> formIds = new List<int>();
            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT form_id FROM users_forms_connect WHERE user_id = {userID}";

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                formIds.Add(Convert.ToInt32(reader["form_id"]));
            }

            return formIds;
        }


        public void SetUserFilledTheForm(int formID, int userID)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"UPDATE users_forms_connect SET form_is_filled = true WHERE user_id = '{userID}' AND form_id = '{formID}'";

            command.ExecuteNonQuery();
        }

        public string SendFormToUsers(string userEmail, int adminID, int formID)
        {
            SQLUsersService userService = new SQLUsersService(_connection);
            var nonConvertedUserId = userService.GetUserId(userEmail);

            if(nonConvertedUserId == -1)
                return userEmail;

            int userID = Convert.ToInt32(nonConvertedUserId);

            using var command = _connection.CreateCommand();

            command.CommandText = $"INSERT INTO users_forms_connect (user_id, form_id, admin_id) VALUES" +
                        $"('{userID}', '{formID}', '{adminID}')";

            command.ExecuteNonQuery();

            return null;
        }
    }
}
