using CityHomeServicesFix.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingsController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpGet]
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
            await _bookingService.GetMyBookingsAsync(userId);

        return Ok(bookings);
    }

    [HttpGet("{requestId:int}")]
    public async Task<IActionResult> GetBookingById(int requestId)
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
            await _bookingService.GetBookingByIdAsync(
                requestId,
                userId);

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

    [HttpPut("{requestId:int}/cancel")]
    public async Task<IActionResult> CancelBooking(int requestId)
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
            await _bookingService.CancelBookingAsync(
                requestId,
                userId);

        if (!cancelled)
        {
            return BadRequest(new
            {
                Success = false,
                Message =
                    "Booking cannot be cancelled. It may not belong to you or may no longer be pending."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Booking cancelled successfully."
        });
    }
}