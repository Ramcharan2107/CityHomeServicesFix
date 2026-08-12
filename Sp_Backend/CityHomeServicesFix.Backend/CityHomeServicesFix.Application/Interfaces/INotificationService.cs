using CityHomeServicesFix.Shared.DTOs.Notification;

namespace CityHomeServicesFix.Application.Interfaces;

public interface INotificationService
{
    Task<List<NotificationDto>> GetByUserIdAsync(
        int userId,
        int? top = null);

    Task<NotificationDto?> GetByIdAsync(
        int notificationId,
        int userId);

    Task<int> GetUnreadCountAsync(int userId);

    Task<bool> MarkAsReadAsync(
        int notificationId,
        int userId);
}