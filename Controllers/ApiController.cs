using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using taskManager.Models;

namespace taskManager.Controllers
{
  public class ApiController : Controller
  {

    static List<Models.Task> data;

    DataContext dbContext;

    public ApiController(DataContext db)
    {
      if (data == null)
      {
        data = new List<Models.Task>();
      }
      dbContext = db;
    }


    public IActionResult Test()
    {
      return Content("I'm the API Controller");
    }

    [HttpGet]
    public IActionResult getTasks()
    {
      System.Console.WriteLine("Sending Tasks from DB");
      List<Models.Task> tasks = dbContext.Tasks.ToList();
      return Json(tasks);
    }

    [HttpPost]
    public IActionResult SaveTask([FromBody] Models.Task taskToSave)
    {
      System.Console.WriteLine(taskToSave.Title);
      System.Console.WriteLine("Save tasks called!");

      // Guid guid = Guid.NewGuid();
      // taskToSave.ID = guid.ToString();

      dbContext.Tasks.Add(taskToSave);
      dbContext.SaveChanges();

      return Json(taskToSave);
    }

    [HttpDelete]
    public IActionResult DelTask(int id = -1)
    {
      if (id == -1) return Json("unable to delete - no id given");

      Models.Task t = dbContext.Tasks.Find(id);
      dbContext.Tasks.Remove(t);
      dbContext.SaveChanges();
      return Ok("Server - Deleted Task id: " + id);
    }

  }
}
