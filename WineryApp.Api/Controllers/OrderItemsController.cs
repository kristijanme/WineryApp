using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WineryApp.Api.Data;
using WineryApp.Api.Models;

namespace WineryApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderItemsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderItems()
        {
            var data = await _context.OrderItems
                .Include(oi => oi.Wine)
                .Include(oi => oi.Order)
                .OrderBy(oi => oi.Id)
                .ToListAsync();

            return data;
        }

        [HttpGet("byOrder/{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetByOrder(int orderId)
        {
            var data = await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .Include(oi => oi.Wine)
                .OrderBy(oi => oi.Id)
                .ToListAsync();

            return data;
        }

        [HttpPost]
        public async Task<ActionResult<OrderItem>> PostOrderItem([FromBody] OrderItem orderItem)
        {
            if (orderItem.WineId <= 0 || orderItem.OrderId <= 0)
                return BadRequest("WineId and OrderId are required and must be valid.");

            orderItem.Wine = null;
            orderItem.Order = null;

            _context.OrderItems.Add(orderItem);
            await _context.SaveChangesAsync();

            var createdItem = await _context.OrderItems
                .Include(oi => oi.Wine)
                .Include(oi => oi.Order)
                .FirstOrDefaultAsync(oi => oi.Id == orderItem.Id);

            return CreatedAtAction(nameof(GetOrderItems), new { id = orderItem.Id }, createdItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderItem(int id)
        {
            var item = await _context.OrderItems.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.OrderItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
