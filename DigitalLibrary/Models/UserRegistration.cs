using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Models
{
    public class UserRegistration
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(256)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Address { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string City { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string State { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string ZipCode { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Country { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [StringLength(10)]
        public string Gender { get; set; } = string.Empty;

        [StringLength(500)]
        public string? ProfilePicture { get; set; }

        [StringLength(100)]
        public string? Occupation { get; set; }

        [StringLength(500)]
        public string? Bio { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        public DateTime? LastLoginDate { get; set; }

        // Foreign key to ASP.NET Core Identity User
        [Required]
        [StringLength(450)]
        public string IdentityUserId { get; set; } = string.Empty;

        // Navigation property
        public virtual Microsoft.AspNetCore.Identity.IdentityUser? IdentityUser { get; set; }
    }
} 