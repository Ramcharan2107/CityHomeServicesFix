using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.FinalReport;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FinalReportsController : ControllerBase
{
    private readonly IFinalReportService _service;

    public FinalReportsController(
        IFinalReportService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var reports =
            await _service.GetAllAsync();

        return Ok(reports);
    }

    [HttpGet("{reportId:int}")]
    public async Task<IActionResult> GetById(
        int reportId)
    {
        var report =
            await _service.GetByIdAsync(reportId);

        if (report == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Final report not found."
            });
        }

        return Ok(report);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> Create(
        [FromBody] CreateFinalReportDto request)
    {
        var userIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var reportId =
            await _service.CreateAsync(
                userId,
                request);

        if (reportId == null)
        {
            return BadRequest(new
            {
                Success = false,
                Message = "Unable to create final report."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Final report created successfully.",
            ReportId = reportId
        });
    }

    [HttpPut("{reportId:int}")]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> Update(
        int reportId,
        [FromBody] UpdateFinalReportDto request)
    {
        var updated =
            await _service.UpdateAsync(
                reportId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Final report not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Final report updated successfully."
        });
    }

    [HttpDelete("{reportId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(
        int reportId)
    {
        var deleted =
            await _service.DeleteAsync(
                reportId);

        if (!deleted)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Final report not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Final report deleted successfully."
        });
    }
}