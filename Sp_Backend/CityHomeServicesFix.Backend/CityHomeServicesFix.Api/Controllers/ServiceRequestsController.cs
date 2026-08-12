using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.ServiceRequest;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServiceRequestsController : ControllerBase
{
    private readonly IServiceRequestService _service;

    public ServiceRequestsController(
        IServiceRequestService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateServiceRequestDto request)
    {
        var userIdClaim =
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                Success = false,
                Message = "Invalid authentication token."
            });
        }

        var requestId =
            await _service.CreateAsync(
                userId,
                request);

        if (requestId == null)
        {
            return BadRequest(new
            {
                Success = false,
                Message =
                    "Unable to create service request. Check the service and address."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Service request created successfully.",
            RequestId = requestId
        });
    }

    [HttpDelete("{requestId:int}")]
    public async Task<IActionResult> Delete(
        int requestId)
    {
        var userIdClaim =
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                Success = false,
                Message = "Invalid authentication token."
            });
        }

        var deleted =
            await _service.DeleteAsync(
                requestId,
                userId);

        if (!deleted)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Service request not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Service request deleted successfully."
        });
    }
    [HttpGet]
    public async Task<IActionResult> GetMyRequests()
    {
        var userIdClaim =
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                Success = false,
                Message = "Invalid authentication token."
            });
        }

        var requests =
            await _service.GetByCustomerAsync(userId);

        return Ok(requests);
    }
    [HttpGet("{requestId:int}")]
    public async Task<IActionResult> GetById(
    int requestId)
    {
        var userIdClaim =
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                Success = false,
                Message = "Invalid authentication token."
            });
        }

        var request =
            await _service.GetByIdAsync(
                requestId,
                userId);

        if (request == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Service request not found."
            });
        }

        return Ok(request);
    }
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllAdmin()
    {
        var requests = await _service.GetAllAsync();

        return Ok(requests);
    }
}