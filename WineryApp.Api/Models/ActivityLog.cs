namespace WineryApp.Api.Models
{
    public class ActivityLog
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Action { get; set; }
        public DateTime ActionDate { get; set; }
    }
}
