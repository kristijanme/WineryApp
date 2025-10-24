using Microsoft.AspNetCore.Mvc;
using WineryApp.Api.Data;
using WineryApp.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

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
    public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderItems() => await _context.OrderItems.Include(oi => oi.Wine).Include(oi => oi.Order).ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderItem>> GetOrderItem(int id)
    {
        var item = await _context.OrderItems.Include(oi => oi.Wine).Include(oi => oi.Order).FirstOrDefaultAsync(oi => oi.Id == id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<OrderItem>> PostOrderItem(OrderItem item)
    {
        _context.OrderItems.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOrderItem), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutOrderItem(int id, OrderItem item)
    {
        if (id != item.Id) return BadRequest();
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrderItem(int id)
    {
        var item = await _context.OrderItems.FindAsync(id);
        if (item == null) return NotFound();
        _context.OrderItems.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
