using Microsoft.AspNetCore.Mvc;
using WineryApp.Api.Models;
using WineryApp.Api.Services;
using System.Collections.Generic;

namespace WineryApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WinesController : ControllerBase
    {
        private readonly WineService _wineService;

        public WinesController(WineService wineService)
        {
            _wineService = wineService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Wine>> GetAll() => Ok(_wineService.GetAll());

        [HttpGet("{id}")]
        public ActionResult<Wine> GetById(int id)
        {
            var wine = _wineService.GetById(id);
            if (wine == null) return NotFound();
            return Ok(wine);
        }

        [HttpPost]
        public ActionResult<Wine> Add([FromBody] Wine wine)
        {
            var created = _wineService.Add(wine);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Wine wine)
        {
            var success = _wineService.Update(id, wine);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _wineService.Delete(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
