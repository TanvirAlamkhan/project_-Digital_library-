using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Models
{
    public enum RequestStatus
    {
        Pending,
        Approved,
        Rejected
    }

    public class BookRequest
    {
        public int Id { get; set; }

        [Required]
        public int BookId { get; set; }

        [Required]
        [StringLength(450)]
        public string MemberId { get; set; } = string.Empty;

        public RequestStatus Status { get; set; } = RequestStatus.Pending;

        public DateTime RequestDate { get; set; } = DateTime.UtcNow;

        public DateTime? ProcessedDate { get; set; }

        [StringLength(500)]
        public string? LibrarianComments { get; set; }

        [StringLength(450)]
        public string? ProcessedByLibrarianId { get; set; }

        // Navigation properties
        public virtual Book Book { get; set; } = null!;
        public virtual Microsoft.AspNetCore.Identity.IdentityUser? Member { get; set; }
        public virtual Microsoft.AspNetCore.Identity.IdentityUser? ProcessedByLibrarian { get; set; }
    }
} 