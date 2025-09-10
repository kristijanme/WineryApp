using Xunit;
using WineryApp.Api.Services;
using WineryApp.Api.Models;
using System.Linq;

namespace WineryApp.Tests
{
    public class WineServiceTests
    {
        private readonly WineService _service;

        public WineServiceTests()
        {
            _service = new WineService();
        }

        [Fact]
        public void AddWine_ShouldIncreaseCount()
        {
            var initial = _service.GetAll().Count();
            _service.Add(new Wine { Name = "Test", Winery = "Test W", Year = 2021, Type = "Red" });
            Assert.Equal(initial + 1, _service.GetAll().Count());
        }

        [Fact]
        public void UpdateWine_ShouldChangeName()
        {
            var wine = _service.Add(new Wine { Name = "Old Name", Winery = "Test", Year = 2021, Type = "White" });
            _service.Update(wine.Id, new Wine { Name = "New Name", Winery = wine.Winery, Year = wine.Year, Type = wine.Type });
            Assert.Equal("New Name", _service.GetById(wine.Id)?.Name);
        }

        [Fact]
        public void DeleteWine_ShouldRemoveWine()
        {
            var wine = _service.Add(new Wine { Name = "Cabernet", Winery = "Test", Year = 2019, Type = "Red" });
            var result = _service.Delete(wine.Id);
            Assert.True(result);
            Assert.Null(_service.GetById(wine.Id));
        }
    }
}
