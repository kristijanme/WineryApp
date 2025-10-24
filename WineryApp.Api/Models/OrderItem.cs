namespace WineryApp.Api.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int WineId { get; set; }
        public Wine Wine { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
