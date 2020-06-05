﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FormManagingService.Models;

namespace FormManagingService.Services
{
    public interface IUsersFormsConnectionController
    {
        public List<UserModel> GetUserWhoGotTheForm(int formID);
    }
}
