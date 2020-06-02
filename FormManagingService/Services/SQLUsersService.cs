using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Services
{
    public class SQLUsersService : IUsersService
    {
        private readonly IDbConnection _connection;

        public SQLUsersService(IDbConnection connection)
        {
            _connection = connection;
        }
        public void AddUser(string name, string email, string password)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"INSERT INTO users (user_name, user_password, user_email) VALUES ('{name}', '{password}', '{email}')";
            
            command.ExecuteNonQuery();
        }

        public int GetUserId(string email)
        {
            using var command = _connection.CreateCommand();

            command.CommandText = $"SELECT user_id FROM users WHERE user_email LIKE '{email}'";

            using var reader = command.ExecuteReader();

            reader.Read();
            int userId = Convert.ToInt32(reader["user_id"]);
            return userId;
        }
    }
}
