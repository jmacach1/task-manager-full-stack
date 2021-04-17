namespace taskManager.Models
{
  public class Task
  {
    public string ID { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool Important { get; set; }
    public string DueDate { get; set; }
    public string Location { get; set; }
    public string AlertText { get; set; }
    public string Status { get; set; }

    public string User { get; set; }

  }
}

