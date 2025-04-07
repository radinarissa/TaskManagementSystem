using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.DTOs;
using TaskManagementSystem.Server.Models;

namespace TaskManagementSystem.Server.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoTaskDto>> GetTasksAsync(string userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .Include(t => t.Priority)
                .Include(t => t.Status)
                .Select(t => new TodoTaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt,
                    DueDate = t.DueDate,
                    PriorityId = t.PriorityId,
                    PriorityName = t.Priority.Name,
                    PriorityColor = t.Priority.Color,
                    StatusId = t.StatusId,
                    StatusName = t.Status.Name
                })
                .ToListAsync();
        }

        public async Task<TodoTaskDto> GetTaskByIdAsync(int id)
        {
            var task = await _context.Tasks
                .Include(t => t.Priority)
                .Include(t => t.Status)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
                return null;

            return new TodoTaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                CreatedAt = task.CreatedAt,
                DueDate = task.DueDate,
                PriorityId = task.PriorityId,
                PriorityName = task.Priority.Name,
                PriorityColor = task.Priority.Color,
                StatusId = task.StatusId,
                StatusName = task.Status.Name
            };
        }

        public async Task<TodoTaskDto> CreateTaskAsync(CreateTaskDto taskDto, string userId)
        {
            var task = new TodoTask
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                CreatedAt = DateTime.Now,
                DueDate = taskDto.DueDate,
                PriorityId = taskDto.PriorityId,
                StatusId = taskDto.StatusId,
                UserId = userId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Извличаме задачата с всички връзки
            return await GetTaskByIdAsync(task.Id);
        }

        public async Task<bool> UpdateTaskAsync(int id, UpdateTaskDto taskDto)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return false;

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.DueDate = taskDto.DueDate;
            task.PriorityId = taskDto.PriorityId;
            task.StatusId = taskDto.StatusId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
