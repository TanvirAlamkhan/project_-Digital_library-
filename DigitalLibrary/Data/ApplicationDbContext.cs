using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DigitalLibrary.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<DigitalLibrary.Models.Admin> Admins { get; set; }
        public DbSet<DigitalLibrary.Models.Librarian> Librarians { get; set; }
        public DbSet<DigitalLibrary.Models.Member> Members { get; set; }
        public DbSet<DigitalLibrary.Models.Book> Books { get; set; }
        public DbSet<DigitalLibrary.Models.Category> Categories { get; set; }
    }
}
