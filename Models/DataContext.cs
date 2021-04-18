using Microsoft.EntityFrameworkCore;

namespace taskManager.Models
{
  public class DataContext : DbContext
  {
    /*
      Run migrations everytime something changes on the model

      dotnet ef migrations add <some_name>
      dotnet ef database update
    
    */

    public DataContext(DbContextOptions<DataContext> conInfo) : base(conInfo)
    {

    }

    // which of your models should become tables inside the DB
    public DbSet<Task> Tasks { get; set; }

  }
}