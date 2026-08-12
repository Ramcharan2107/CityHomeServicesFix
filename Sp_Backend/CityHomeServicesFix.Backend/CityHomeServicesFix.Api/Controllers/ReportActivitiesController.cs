using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.ReportActivity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReportActivitiesController : ControllerBase
{
    private readonly IReportActivityService _service;

    public ReportActivitiesController(
        IReportActivityService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var activities =
            await _service.GetAllAsync();

        return Ok(activities);
    }

    [HttpGet("{activityId:int}")]
    public async Task<IActionResult> GetById(
        int activityId)
    {
        var activity =
            await _service.GetByIdAsync(activityId);

        if (activity == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Report activity not found."
            });
        }

        return Ok(activity);
    }

    [HttpGet("report/{reportId:int}")]
    public async Task<IActionResult> GetByReportId(
        int reportId)
    {
        var activities =
            await _service.GetByReportIdAsync(reportId);

        return Ok(activities);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> Create(
        [FromBody] CreateReportActivityDto request)
    {
        var activityId =
            await _service.CreateAsync(request);

        if (activityId == null)
        {
            return BadRequest(new
            {
                Success = false,
                Message = "Unable to create report activity."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Report activity created successfully.",
            ActivityId = activityId
        });
    }

    [HttpPut("{activityId:int}")]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> Update(
        int activityId,
        [FromBody] UpdateReportActivityDto request)
    {
        var updated =
            await _service.UpdateAsync(
                activityId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Report activity not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Report activity updated successfully."
        });
    }

    [HttpDelete("{activityId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(
        int activityId)
    {
        var deleted =
            await _service.DeleteAsync(activityId);

        if (!deleted)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Report activity not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Report activity deleted successfully."
        });
    }
}