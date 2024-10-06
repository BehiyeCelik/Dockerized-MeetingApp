using System.ComponentModel.DataAnnotations;

namespace MeetingApp.Models{
    public class UserInfo
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Enter your name!")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Enter your phone number!")]
        public string? Phone { get; set; }
        [Required(ErrorMessage = "Enter your email address!")]
        [EmailAddress(ErrorMessage = "Incorrect email address!")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Please select your participation status.")]
        public bool? WillYouAttend { get; set; }
    }
}