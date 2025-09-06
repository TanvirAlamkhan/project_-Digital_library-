using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Models
{
    public class BookBorrow
    {
        public int Id { get; set; }

        [Required]
        public int BookId { get; set; }

        [Required]
        [StringLength(450)]
        public string MemberId { get; set; } = string.Empty;

        [Required]
        public DateTime BorrowDate { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime DueDate { get; set; }

        public DateTime? ReturnDate { get; set; }

        public decimal FineAmount { get; set; } = 0;

        public bool IsPaid { get; set; } = false;

        public bool IsReturned { get; set; } = false;

        [StringLength(450)]
        public string? IssuedByLibrarianId { get; set; }

        [StringLength(450)]
        public string? ReturnedToLibrarianId { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Book Book { get; set; } = null!;
        public virtual Microsoft.AspNetCore.Identity.IdentityUser? Member { get; set; }
        public virtual Microsoft.AspNetCore.Identity.IdentityUser? IssuedByLibrarian { get; set; }
        public virtual Microsoft.AspNetCore.Identity.IdentityUser? ReturnedToLibrarian { get; set; }
    }
} 