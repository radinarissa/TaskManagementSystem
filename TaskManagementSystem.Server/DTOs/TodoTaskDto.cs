namespace TaskManagementSystem.Server.DTOs
{
    public class TodoTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public int PriorityId { get; set; }
        public string PriorityName { get; set; }
        public string PriorityColor { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
    }
}
