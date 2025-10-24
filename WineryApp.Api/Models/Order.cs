namespace WineryApp.Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public User User { get; set; }            
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
