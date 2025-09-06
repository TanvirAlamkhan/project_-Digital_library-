using DigitalLibrary.Data;
using DigitalLibrary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace DigitalLibrary.Controllers
{
    public class MemberController : Controller
    {
        private readonly ApplicationDbContext _context;
        public MemberController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // For now, return the dashboard view with no model (mock data will be added in the view)
            return View();
        }

        public IActionResult MyBorrowing()
        {
            // In a real app, fetch borrowing data for the logged-in member
            return View();
        }

        [HttpGet]
        public IActionResult SearchBook()
        {
            var categories = _context.Categories.ToList();
            var books = _context.Books.Include(b => b.Category).ToList();
            ViewBag.Categories = categories;
            ViewBag.Results = books.Select(b => new {
                b.Title,
                b.Author,
                b.ISBN,
                Category = b.Category != null ? b.Category.Name : "",
                PublishedYear = b.PublishedDate?.Year,
                Available = b.AvailableCopies > 0,
                CoverImage = string.IsNullOrEmpty(b.CoverImage) ? "" : b.CoverImage
            }).ToArray();
            return View();
        }

        [HttpPost]
        public IActionResult SearchBook(string title, string author, string isbn, int? categoryId, int? year, bool? available)
        {
            var categories = _context.Categories.ToList();
            var books = _context.Books.Include(b => b.Category).AsQueryable();
            if (!string.IsNullOrWhiteSpace(title))
                books = books.Where(b => b.Title.Contains(title));
            if (!string.IsNullOrWhiteSpace(author))
                books = books.Where(b => b.Author.Contains(author));
            if (!string.IsNullOrWhiteSpace(isbn))
                books = books.Where(b => b.ISBN.Contains(isbn));
            if (categoryId.HasValue)
                books = books.Where(b => b.CategoryID == categoryId);
            if (year.HasValue)
                books = books.Where(b => b.PublishedDate.HasValue && b.PublishedDate.Value.Year == year);
            if (available.HasValue && available.Value)
                books = books.Where(b => b.AvailableCopies > 0);
            var resultList = books.ToList();
            ViewBag.Categories = categories;
            ViewBag.Results = resultList.Select(b => new {
                b.Title,
                b.Author,
                b.ISBN,
                Category = b.Category != null ? b.Category.Name : "",
                PublishedYear = b.PublishedDate?.Year,
                Available = b.AvailableCopies > 0,
                CoverImage = string.IsNullOrEmpty(b.CoverImage) ? "" : b.CoverImage
            }).ToArray();
            return View();
        }

        [HttpGet]
        public IActionResult Profile()
        {
            // In a real app, fetch user info and borrowing summary from DB
            ViewBag.Profile = new {
                FullName = "Enter your Name ",
                Email = "Enter your gmail ",
                ProfileImage = "/images/client-img.png"
            };
            ViewBag.CurrentBorrowings = new[] {
                new { Title = "C# in Depth", DueDate = DateTime.Now.AddDays(5), Status = "Due" },
                new { Title = "AI Basics", DueDate = DateTime.Now.AddDays(-2), Status = "Overdue" }
            };
            ViewBag.BorrowHistory = new[] {
                new { Title = "Clean Code", BorrowDate = DateTime.Now.AddMonths(-2), ReturnDate = DateTime.Now.AddMonths(-2).AddDays(9) },
                new { Title = "Design Patterns", BorrowDate = DateTime.Now.AddMonths(-1), ReturnDate = DateTime.Now.AddMonths(-1).AddDays(12) }
            };
            ViewBag.TotalFines = 40;
            return View();
        }

        [HttpPost]
        public IActionResult Profile(string fullName, string email, string password, string profileImage)
        {
            // In a real app, update user info in DB and validate
            ViewBag.Success = true;
            // Reload profile info (mock)
            ViewBag.Profile = new {
                FullName = fullName,
                Email = email,
                ProfileImage = profileImage
            };
            ViewBag.CurrentBorrowings = new[] {
                new { Title = "C# in Depth", DueDate = DateTime.Now.AddDays(5), Status = "Due" },
                new { Title = "AI Basics", DueDate = DateTime.Now.AddDays(-2), Status = "Overdue" }
            };
            ViewBag.BorrowHistory = new[] {
                new { Title = "Clean Code", BorrowDate = DateTime.Now.AddMonths(-2), ReturnDate = DateTime.Now.AddMonths(-2).AddDays(9) },
                new { Title = "Design Patterns", BorrowDate = DateTime.Now.AddMonths(-1), ReturnDate = DateTime.Now.AddMonths(-1).AddDays(12) }
            };
            ViewBag.TotalFines = 40;
            return View();
        }
    }
} 