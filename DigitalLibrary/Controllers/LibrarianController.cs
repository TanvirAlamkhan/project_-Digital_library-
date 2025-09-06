using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DigitalLibrary.Models;
using DigitalLibrary.Data;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;

namespace DigitalLibrary.Controllers
{
    [Authorize(Roles = "Librarian,Admin")]
    public class LibrarianController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        public LibrarianController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public IActionResult LibrarianDashboard()
        {
            return View();
        }

        [HttpGet]
        public IActionResult AddBook()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddBook(Book model, IFormFile? CoverImageFile)
        {
            if (model.AvailableCopies > model.TotalCopies)
            {
                ModelState.AddModelError("AvailableCopies", "Available copies cannot exceed total copies.");
            }
            if (CoverImageFile != null && CoverImageFile.Length > 0)
            {
                var ext = Path.GetExtension(CoverImageFile.FileName).ToLower();
                if (ext != ".jpg" && ext != ".jpeg" && ext != ".png")
                {
                    ModelState.AddModelError("CoverImageFile", "Only JPG and PNG images are allowed.");
                }
                else if (CoverImageFile.Length > 2 * 1024 * 1024)
                {
                    ModelState.AddModelError("CoverImageFile", "Image size must be less than 2MB.");
                }
            }
            if (_context.Books.Any(b => b.ISBN == model.ISBN))
            {
                ModelState.AddModelError("ISBN", "A book with this ISBN already exists.");
            }
            if (ModelState.IsValid)
            {
                if (CoverImageFile != null && CoverImageFile.Length > 0)
                {
                    var fileName = $"book_{Guid.NewGuid()}{Path.GetExtension(CoverImageFile.FileName)}";
                    var filePath = Path.Combine(_env.WebRootPath, "images", fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        CoverImageFile.CopyTo(stream);
                    }
                    model.CoverImage = "/images/" + fileName;
                }
                _context.Books.Add(model);
                _context.SaveChanges();
                ViewBag.Success = true;
                ModelState.Clear();
                return View();
            }
            return View(model);
        }
    }
} 