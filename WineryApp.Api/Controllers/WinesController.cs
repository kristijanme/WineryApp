using Microsoft.AspNetCore.Mvc;
using WineryApp.Api.Data;
using WineryApp.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace WineryApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WinesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WinesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Wine>> GetAll()
        {
            return Ok(_context.Wines.Where(w => !w.IsDeleted).ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Wine> GetById(int id)
        {
            var wine = _context.Wines.FirstOrDefault(w => w.Id == id && !w.IsDeleted);
            if (wine == null)
                return NotFound();

            return Ok(wine);
        }

        [HttpPost]
        public ActionResult<Wine> Add([FromBody] Wine wine)
        {
            if (wine == null)
                return BadRequest("Invalid wine data.");

            _context.Wines.Add(wine);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = wine.Id }, wine);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Wine wine)
        {
            var existing = _context.Wines.FirstOrDefault(w => w.Id == id && !w.IsDeleted);
            if (existing == null)
                return NotFound();

            existing.Name = wine.Name;
            existing.Winery = wine.Winery;
            existing.Year = wine.Year;
            existing.Type = wine.Type;
            existing.Price = wine.Price;
            existing.StockQuantity = wine.StockQuantity;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var wine = _context.Wines.FirstOrDefault(w => w.Id == id);
            if (wine == null)
                return NotFound();

            bool isUsedInOrders = _context.OrderItems.Any(o => o.WineId == id);
            if (isUsedInOrders)
            {
                wine.IsDeleted = true;
                _context.SaveChanges();
                return NoContent();
            }

            _context.Wines.Remove(wine);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
