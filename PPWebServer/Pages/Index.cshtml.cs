using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PPWebServer.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
           // HttpContext.Response.Headers.Add("Cross-Origin-Embedder-Policy", "require-corp");
            //HttpContext.Response.Headers.Add("Cross-Origin-Opener-Policy", "same-origin");
        }
    }
}