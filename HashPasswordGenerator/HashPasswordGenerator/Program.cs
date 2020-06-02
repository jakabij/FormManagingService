using System;
using System.Security.Cryptography;

namespace HashPasswordGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Add the password:");
            string password = Console.ReadLine();


            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);   //Create salt - injection for further security

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000); //Create the Rfc2898DeriveBytes and get the hash value:
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];  // combine the salt and password
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            string savedPasswordHash = Convert.ToBase64String(hashBytes);

            Console.WriteLine(savedPasswordHash);
            Console.WriteLine();
        }
    }
}
