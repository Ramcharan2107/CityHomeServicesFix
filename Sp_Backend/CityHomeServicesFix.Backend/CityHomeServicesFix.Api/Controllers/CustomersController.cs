using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Customer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomersController(
        ICustomerService customerService)
    {
        _customerService = customerService;
    }

    // ================= DASHBOARD =================

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
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

        var dashboard =
            await _customerService.GetDashboardAsync(userId);

        if (dashboard == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Customer profile not found."
            });
        }

        return Ok(dashboard);
    }

    // ================= PROFILE =================

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userIdClaim =
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var profile =
            await _customerService.GetProfileAsync(userId);

        if (profile == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Customer profile not found."
            });
        }

        return Ok(profile);
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile(
        [FromBody] UpdateCustomerProfileDto request)
    {
        var userIdClaim =
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var updated =
            await _customerService.UpdateProfileAsync(
                userId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Customer profile not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Customer profile updated successfully."
        });
    }

    // ================= MY BOOKINGS =================

    [HttpGet("bookings")]
    public async Task<IActionResult> GetMyBookings()
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

        var bookings =
            await _customerService.GetMyBookingsAsync(userId);

        return Ok(bookings);
    }

    // ================= BOOKING DETAILS =================

    [HttpGet("bookings/{id:int}")]
    public async Task<IActionResult> GetBooking(int id)
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

        var booking =
            await _customerService.GetBookingAsync(
                userId,
                id);

        if (booking == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Booking not found."
            });
        }

        return Ok(booking);
    }

    // ================= CANCEL BOOKING =================

    [HttpPut("bookings/{id:int}/cancel")]
    public async Task<IActionResult> CancelBooking(int id)
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

        var cancelled =
            await _customerService.CancelBookingAsync(
                userId,
                id);

        if (!cancelled)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Booking not found or cannot be cancelled."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Booking cancelled successfully."
        });
    }
}