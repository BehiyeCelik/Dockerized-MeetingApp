namespace MeetingApp.Models
{
    public static class Repository
    {
        private static List<UserInfo> _users = new();

        static Repository()
        {
           _users.Add(new UserInfo() {Id=1, Name = "Chandler", Email = "abc@gmail.com", Phone = "11111", DoYouAttend=true }) ;
           _users.Add (new UserInfo() {Id=2, Name = "Monica", Email = "abcd@gmail.com", Phone = "22222", DoYouAttend=false } );
           _users.Add (new UserInfo() {Id=3, Name = "Joey", Email = "abce@gmail.com", Phone = "33333", DoYouAttend=true } );
        }
        public static List<UserInfo> Users {
            get 
            {
                return _users;
            }
        }
        public static void CreateUser(UserInfo user)
        {
            user.Id=Users.Count +1;
            _users.Add(user);
        }
        public static UserInfo? GetById(int id) // her bir user a döngüde olduğu gibi erişme imkanımız sağlanır ve user ın Id si dışarıdan gönderdiğimiz Id ile eşleşiyorsa bu durumda bulmuş olduğu user ı geriye gönderir.  
        {
        return _users.FirstOrDefault (user => user.Id == id);  
        }
}
}