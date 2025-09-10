namespace WineryApp.Api.Models
{
    public class Wine
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Winery { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Type { get; set; } = string.Empty; // Пример: Црвено, Бело, Розе
    }
}
