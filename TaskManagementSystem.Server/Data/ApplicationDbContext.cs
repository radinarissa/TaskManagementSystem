using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Models;

namespace TaskManagementSystem.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<TodoTask> Tasks { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Status>().HasData(
                new Status { Id = 1, Name = "New" },
                new Status { Id = 2, Name = "Open" },
                new Status { Id = 3, Name = "InProgress" },
                new Status { Id = 4, Name = "Resolved" },
                new Status { Id = 5, Name = "Closed" }
            );

            builder.Entity<Priority>().HasData(
                new Priority { Id = 1, Name = "Low", Color = "#28a745" },
                new Priority { Id = 2, Name = "Medium", Color = "#ffc107" },
                new Priority { Id = 3, Name = "High", Color = "#dc3545" }
            );
        }
    }
}
