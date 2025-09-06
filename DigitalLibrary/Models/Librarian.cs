using System;
using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Models
{
    public class Librarian
    {
        [Key]
        public int LibrarianID { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public DateTime DateOfRegistration { get; set; } = DateTime.Now;

        [MaxLength(255)]
        public string? ProfileImage { get; set; }
    }
} 