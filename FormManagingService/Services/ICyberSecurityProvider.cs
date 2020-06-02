using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FormManagingService.Services
{
    public interface ICyberSecurityProvider
    {
        public string EncryptPassword(string password);
        public bool IsValidUser(string email, string password);
    }
}
