using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.ReportMaterial;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReportMaterialsController : ControllerBase
{
    private readonly IReportMaterialService _service;

    public ReportMaterialsController(
        IReportMaterialService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var materials =
            await _service.GetAllAsync();

        return Ok(materials);
    }

    [HttpGet("{materialId:int}")]
    public async Task<IActionResult> GetById(
        int materialId)
    {
        var material =
            await _service.GetByIdAsync(materialId);

        if (material == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Report material not found."
            });
        }

        return Ok(material);
    }

    [HttpGet("report/{reportId:int}")]
    public async Task<IActionResult> GetByReportId(
        int reportId)
    {
        var materials =
            await _service.GetByReportIdAsync(reportId);

        return Ok(materials);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> Create(
        [FromBody] CreateReportMaterialDto request)
    {
        var materialId =
            await _service.CreateAsync(request);

        if (materialId == null)
        {
            return BadRequest(new
            {
                Success = false,
                Message = "Unable to create report material."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Report material created successfully.",
            MaterialId = materialId
        });
    }

    [HttpPut("{materialId:int}")]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> Update(
        int materialId,
        [FromBody] UpdateReportMaterialDto request)
    {
        var updated =
            await _service.UpdateAsync(
                materialId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Report material not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Report material updated successfully."
        });
    }

    [HttpDelete("{materialId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(
        int materialId)
    {
        var deleted =
            await _service.DeleteAsync(materialId);

        if (!deleted)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Report material not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Report material deleted successfully."
        });
    }
}