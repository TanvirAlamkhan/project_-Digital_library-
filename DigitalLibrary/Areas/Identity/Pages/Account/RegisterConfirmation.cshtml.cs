using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Routing;

namespace DigitalLibrary.Areas.Identity.Pages.Account
{
    public class RegisterConfirmationModel : PageModel
    {
        public string Email { get; set; } = string.Empty;
        public bool DisplayConfirmAccountLink { get; set; }
        public string EmailConfirmationUrl { get; set; } = string.Empty;

        public void OnGet(string email, string? returnUrl = null)
        {
            Email = email;
            DisplayConfirmAccountLink = true;
            EmailConfirmationUrl = $"{Request.Scheme}://{Request.Host}/Identity/Account/ConfirmEmail?userId=sample-user-id&code=sample-code&returnUrl={returnUrl}";
        }
    }
} 