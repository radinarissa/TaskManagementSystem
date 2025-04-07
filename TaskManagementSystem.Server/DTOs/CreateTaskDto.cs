using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime? DueDate { get; set; }

        [Required]
        public int PriorityId { get; set; }

        [Required]
        public int StatusId { get; set; }
    }
}
