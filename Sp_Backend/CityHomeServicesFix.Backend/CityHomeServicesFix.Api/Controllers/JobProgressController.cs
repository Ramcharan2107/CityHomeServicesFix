using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.JobProgress;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobProgressController : ControllerBase
{
    private readonly IJobProgressService _service;

    public JobProgressController(
        IJobProgressService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var progress =
            await _service.GetAllAsync();

        return Ok(progress);
    }

    [HttpGet("{progressId:int}")]
    public async Task<IActionResult> GetById(
        int progressId)
    {
        var progress =
            await _service.GetByIdAsync(progressId);

        if (progress == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Job progress not found."
            });
        }

        return Ok(progress);
    }

    [HttpGet("assignment/{assignmentId:int}")]
    public async Task<IActionResult> GetByAssignmentId(
        int assignmentId)
    {
        var progress =
            await _service.GetByAssignmentIdAsync(
                assignmentId);

        return Ok(progress);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> Create(
        [FromBody] CreateJobProgressDto request)
    {
        var userIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var progressId =
            await _service.CreateAsync(
                userId,
                request);

        if (progressId == null)
        {
            return BadRequest(new
            {
                Success = false,
                Message = "Unable to create job progress."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Job progress created successfully.",
            ProgressId = progressId
        });
    }

    [HttpPut("{progressId:int}")]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> Update(
        int progressId,
        [FromBody] UpdateJobProgressDto request)
    {
        var updated =
            await _service.UpdateAsync(
                progressId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Job progress not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Job progress updated successfully."
        });
    }

    [HttpDelete("{progressId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(
        int progressId)
    {
        var deleted =
            await _service.DeleteAsync(
                progressId);

        if (!deleted)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Job progress not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Job progress deleted successfully."
        });
    }
}