namespace WineryApp.Api.Models
{
    public class Wine
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Winery { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Type { get; set; } = string.Empty; // Црвено, Бело, Розе
        public decimal Price { get; set; } // Цена на вино
        public int StockQuantity { get; set; } // Колку е на залиха

        // Поврзување со нарачки
        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}