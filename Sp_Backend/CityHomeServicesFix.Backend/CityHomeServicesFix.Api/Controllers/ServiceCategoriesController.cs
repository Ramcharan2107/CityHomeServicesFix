using CityHomeServicesFix.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServiceCategoriesController : ControllerBase
{
    private readonly IServiceCategoryService _service;

    public ServiceCategoriesController(
        IServiceCategoryService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories =
            await _service.GetAllAsync();

        return Ok(categories);
    }

    [HttpGet("{categoryId:int}")]
    public async Task<IActionResult> GetById(
        int categoryId)
    {
        var category =
            await _service.GetByIdAsync(categoryId);

        if (category == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Service category not found."
            });
        }

        return Ok(category);
    }
}