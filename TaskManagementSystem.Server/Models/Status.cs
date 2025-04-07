using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.Models
{
    public class Status
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public ICollection<TodoTask> Tasks { get; set; } = new List<TodoTask>();

    }
}
