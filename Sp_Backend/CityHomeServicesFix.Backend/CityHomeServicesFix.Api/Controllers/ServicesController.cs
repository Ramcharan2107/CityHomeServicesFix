using CityHomeServicesFix.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class ServicesController : ControllerBase
{
    private readonly IServiceCatalogService _service;

    public ServicesController(IServiceCatalogService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var services = await _service.GetAllAsync();

        return Ok(services);
    }

    [HttpGet("{serviceId:int}")]
    public async Task<IActionResult> GetById(int serviceId)
    {
        var service = await _service.GetByIdAsync(serviceId);

        if (service == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Service not found."
            });
        }

        return Ok(service);
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActive(
        [FromQuery] int top = 5)
    {
        var services =
            await _service.GetActiveTopAsync(top);

        return Ok(services);
    }
}