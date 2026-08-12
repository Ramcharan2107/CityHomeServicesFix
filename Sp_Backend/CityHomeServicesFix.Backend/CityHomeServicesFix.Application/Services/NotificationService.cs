using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Notification;

namespace CityHomeServicesFix.Application.Services;

public class NotificationService : INotificationService
{
    private readonly INotificationRepository _repository;

    public NotificationService(
        INotificationRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<NotificationDto>> GetByUserIdAsync(
        int userId,
        int? top = null)
    {
        return await _repository.GetByUserIdAsync(
            userId,
            top);
    }

    public async Task<NotificationDto?> GetByIdAsync(
        int notificationId,
        int userId)
    {
        return await _repository.GetByIdAsync(
            notificationId,
            userId);
    }

    public async Task<int> GetUnreadCountAsync(int userId)
    {
        return await _repository.GetUnreadCountAsync(userId);
    }

    public async Task<bool> MarkAsReadAsync(
        int notificationId,
        int userId)
    {
        return await _repository.MarkAsReadAsync(
            notificationId,
            userId);
    }
}