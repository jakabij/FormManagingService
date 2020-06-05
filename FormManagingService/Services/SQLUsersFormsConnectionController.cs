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
    }
}
