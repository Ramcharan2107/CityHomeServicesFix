using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Technician;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TechniciansController : ControllerBase
{
    private readonly ITechnicianService _technicianService;

    public TechniciansController(
        ITechnicianService technicianService)
    {
        _technicianService = technicianService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var technicians =
            await _technicianService.GetAllAsync();

        return Ok(technicians);
    }

    [HttpGet("{technicianId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetById(
        int technicianId)
    {
        var technician =
            await _technicianService.GetByIdAsync(
                technicianId);

        if (technician == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Technician not found."
            });
        }

        return Ok(technician);
    }

    [HttpGet("me")]
    [Authorize(Roles = "Technician")]
    public async Task<IActionResult> GetMyProfile()
    {
        var userIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var technician =
            await _technicianService.GetByUserIdAsync(
                userId);

        if (technician == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Technician profile not found."
            });
        }

        return Ok(technician);
    }

    [HttpGet("available")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAvailable()
    {
        var technicians =
            await _technicianService.GetAvailableAsync();

        return Ok(technicians);
    }

    [HttpPut("{technicianId:int}/status")]
    [Authorize(Roles = "Admin,Technician")]
    public async Task<IActionResult> SetStatus(
        int technicianId,
        [FromBody] UpdateTechnicianStatusDto request)
    {
        var userIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        // Technician can only update their own status.
        var technician =
            await _technicianService.GetByIdAsync(
                technicianId);

        if (technician == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Technician not found."
            });
        }

        if (User.IsInRole("Technician") &&
            technician.UserId != userId)
        {
            return Forbid();
        }

        var updated =
            await _technicianService.SetStatusAsync(
                technicianId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Technician not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Technician status updated successfully."
        });
    }
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(
    [FromBody] CreateTechnicianDto request)
    {
        var technicianId =
            await _technicianService.CreateAsync(request);

        if (technicianId == null)
        {
            return BadRequest(new
            {
                Success = false,
                Message = "Unable to create technician."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Technician created successfully.",
            TechnicianId = technicianId
        });
    }
    [HttpPut("{technicianId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(
    int technicianId,
    [FromBody] UpdateTechnicianDto request)
    {
        var updated =
            await _technicianService.UpdateAsync(
                technicianId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Technician not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Technician updated successfully."
        });
    }
}