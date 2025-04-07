using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.Models
{
    public class TodoTask
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? DueDate { get; set; }

        public int PriorityId { get; set; }
        public Priority Priority { get; set; }

        public int StatusId { get; set; }
        public Status Status { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
