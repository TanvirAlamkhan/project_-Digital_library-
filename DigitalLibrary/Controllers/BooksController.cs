using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalLibrary.Data;
using DigitalLibrary.Models;
using System.Threading.Tasks;

public class BooksController : Controller
{
    private readonly ApplicationDbContext _context;

    public BooksController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: Books
    public async Task<IActionResult> Index()
    {
        var books = await _context.Books
            .Include(b => b.Category) // if you have Category as a navigation property
            .ToListAsync();

        return View(books);
    }
}
