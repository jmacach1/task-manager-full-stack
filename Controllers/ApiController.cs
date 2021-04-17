using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using taskManager.Models;
using System.Collections.Generic;

namespace taskManager.Controllers
{
  public class ApiController : Controller
  {

    static List<Models.Task> data;
    private readonly ILogger<ApiController> _logger;

    public ApiController(ILogger<ApiController> logger)
    {
      _logger = logger;
      if (data == null) data = new List<Models.Task>();
    }

    public IActionResult Test()
    {
      return Content("I'm the API Controller");
    }

    [HttpGet]
    public IActionResult getTasks()
    {
      return Json(data);
    }

    [HttpPost]
    public IActionResult SaveTask([FromBody] Models.Task taskToSave)
    {
      System.Console.WriteLine(taskToSave.Title);
      System.Console.WriteLine("Save tasks called!");
      Guid guid = Guid.NewGuid();
      taskToSave.ID = guid.ToString();

      data.Add(taskToSave);
      return Json(taskToSave);
    }

  }
}
