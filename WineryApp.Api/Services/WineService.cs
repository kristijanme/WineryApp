using System.Collections.Generic;
using System.Linq;
using WineryApp.Api.Models;

namespace WineryApp.Api.Services
{
    public class WineService
    {
        private readonly List<Wine> _wines = new();
        private int _nextId = 1;

        public WineService()
        {
            Add(new Wine { Name = "Merlot", Winery = "Local Winery", Year = 2020, Type = "Red" });
            Add(new Wine { Name = "Chardonnay", Winery = "Hill Winery", Year = 2019, Type = "White" });
        }

        public IEnumerable<Wine> GetAll() => _wines;

        public Wine? GetById(int id) => _wines.FirstOrDefault(w => w.Id == id);

        public Wine Add(Wine wine)
        {
            wine.Id = _nextId++;
            _wines.Add(wine);
            return wine;
        }

        public bool Update(int id, Wine updatedWine)
        {
            var wine = GetById(id);
            if (wine == null) return false;

            wine.Name = updatedWine.Name;
            wine.Winery = updatedWine.Winery;
            wine.Year = updatedWine.Year;
            wine.Type = updatedWine.Type;
            return true;
        }

        public bool Delete(int id)
        {
            var wine = GetById(id);
            if (wine == null) return false;

            _wines.Remove(wine);
            return true;
        }
    }
}
