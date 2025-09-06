using System.ComponentModel.DataAnnotations;

namespace DigitalLibrary.Models
{
    public class Book
    {
        [Key]
        public int BookID { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(150)]
        public string Author { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string ISBN { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Publisher { get; set; }

        [DataType(DataType.Date)]
        public DateTime? PublishedDate { get; set; }

        [Required]
        public int CategoryID { get; set; }

        [StringLength(255)]
        public string? CoverImage { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int TotalCopies { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int AvailableCopies { get; set; }

        // Navigation property
        public virtual Category? Category { get; set; }
    }
} 