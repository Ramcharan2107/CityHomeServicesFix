using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.JobAssignment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobAssignmentsController : ControllerBase
{
    private readonly IJobAssignmentService _service;

    public JobAssignmentsController(
        IJobAssignmentService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var assignments =
            await _service.GetAllAsync();

        return Ok(assignments);
    }

    [HttpGet("{assignmentId:int}")]
    public async Task<IActionResult> GetById(
        int assignmentId)
    {
        var assignment =
            await _service.GetByIdAsync(
                assignmentId);

        if (assignment == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Job assignment not found."
            });
        }

        return Ok(assignment);
    }

    [HttpGet("request/{requestId:int}")]
    public async Task<IActionResult> GetByRequestId(
        int requestId)
    {
        var assignments =
            await _service.GetByRequestIdAsync(
                requestId);

        return Ok(assignments);
    }

    [HttpGet("technician/{technicianId:int}")]
    public async Task<IActionResult> GetByTechnicianId(
        int technicianId)
    {
        var assignments =
            await _service.GetByTechnicianIdAsync(
                technicianId);

        return Ok(assignments);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(
        [FromBody] CreateJobAssignmentDto request)
    {
        var userIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var assignmentId =
            await _service.CreateAsync(
                userId,
                request);

        if (assignmentId == null)
        {
            return BadRequest(new
            {
                Success = false,
                Message = "Unable to create job assignment."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Job assignment created successfully.",
            AssignmentId = assignmentId
        });
    }

    [HttpPut("{assignmentId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(
        int assignmentId,
        [FromBody] UpdateJobAssignmentDto request)
    {
        var updated =
            await _service.UpdateAsync(
                assignmentId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Job assignment not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Job assignment updated successfully."
        });
    }

    [HttpDelete("{assignmentId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(
        int assignmentId)
    {
        var deleted =
            await _service.DeleteAsync(
                assignmentId);

        if (!deleted)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Job assignment not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Job assignment deleted successfully."
        });
    }
}