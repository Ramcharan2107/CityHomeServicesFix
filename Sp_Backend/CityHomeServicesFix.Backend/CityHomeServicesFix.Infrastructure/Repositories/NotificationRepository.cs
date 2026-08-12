using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.Notification;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class NotificationRepository : INotificationRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public NotificationRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<NotificationDto>> GetByUserIdAsync(
        int userId,
        int? top = null)
    {
        using var connection = _connectionFactory.CreateConnection();

        var notifications =
            await connection.QueryAsync<NotificationDto>(
                "sp_GetNotificationsByUserId",
                new
                {
                    UserId = userId,
                    Top = top
                },
                commandType: CommandType.StoredProcedure);

        return notifications.ToList();
    }

    public async Task<NotificationDto?> GetByIdAsync(
        int notificationId,
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var notification =
            await connection.QueryFirstOrDefaultAsync<NotificationDto>(
                "sp_GetNotificationById",
                new
                {
                    NotificationId = notificationId
                },
                commandType: CommandType.StoredProcedure);

        // Ownership check
        if (notification == null ||
            notification.UserId != userId)
        {
            return null;
        }

        return notification;
    }

    public async Task<int> GetUnreadCountAsync(int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.ExecuteScalarAsync<int>(
            "sp_GetUnreadNotificationCountByUserId",
            new
            {
                UserId = userId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<bool> MarkAsReadAsync(
        int notificationId,
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        // Verify notification belongs to the logged-in user.
        var notification =
            await connection.QueryFirstOrDefaultAsync<NotificationDto>(
                "sp_GetNotificationById",
                new
                {
                    NotificationId = notificationId
                },
                commandType: CommandType.StoredProcedure);

        if (notification == null ||
            notification.UserId != userId)
        {
            return false;
        }

        await connection.ExecuteAsync(
            "sp_MarkNotificationAsRead",
            new
            {
                NotificationId = notificationId
            },
            commandType: CommandType.StoredProcedure);

        return true;
    }
}