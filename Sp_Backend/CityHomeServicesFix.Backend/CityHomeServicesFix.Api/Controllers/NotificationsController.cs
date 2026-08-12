using CityHomeServicesFix.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationsController(
        INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    private bool TryGetUserId(out int userId)
    {
        return int.TryParse(
            User.FindFirstValue(ClaimTypes.NameIdentifier),
            out userId);
    }

    [HttpGet]
    public async Task<IActionResult> GetNotifications(
        [FromQuery] int? top = null)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var notifications =
            await _notificationService.GetByUserIdAsync(
                userId,
                top);

        return Ok(notifications);
    }

    [HttpGet("{notificationId:int}")]
    public async Task<IActionResult> GetNotification(
        int notificationId)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var notification =
            await _notificationService.GetByIdAsync(
                notificationId,
                userId);

        if (notification == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Notification not found."
            });
        }

        return Ok(notification);
    }

    [HttpGet("unread-count")]
    public async Task<IActionResult> GetUnreadCount()
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var count =
            await _notificationService.GetUnreadCountAsync(
                userId);

        return Ok(new
        {
            UnreadCount = count
        });
    }

    [HttpPut("{notificationId:int}/read")]
    public async Task<IActionResult> MarkAsRead(
        int notificationId)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var result =
            await _notificationService.MarkAsReadAsync(
                notificationId,
                userId);

        if (!result)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Notification not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Notification marked as read."
        });
    }
}