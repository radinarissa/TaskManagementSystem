using TaskManagementSystem.Server.DTOs;

namespace TaskManagementSystem.Server.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TodoTaskDto>> GetTasksAsync(string userId);
        Task<TodoTaskDto> GetTaskByIdAsync(int id);
        Task<TodoTaskDto> CreateTaskAsync(CreateTaskDto taskDto, string userId);
        Task<bool> UpdateTaskAsync(int id, UpdateTaskDto taskDto);
        Task<bool> DeleteTaskAsync(int id);
    }
}
