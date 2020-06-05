using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Models
{
    public class UserModel
    {
        public int UserID { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public bool IsFilledTheForm { get; set; }

        public UserModel(int userID, string email, string username, bool isFilledTheForm)
        {
            UserID = userID;
            Email = email;
            Username = username;
            IsFilledTheForm = isFilledTheForm;
        }
    }
}
