using Microsoft.AspNetCore.Identity;

namespace TaskManagementSystem.Server.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<TodoTask> Tasks { get; set; } = new List<TodoTask>();
    }
}
