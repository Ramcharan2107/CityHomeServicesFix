using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.Customer;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CustomerRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    // ================= CUSTOMER =================

    public async Task<CustomerInfoDto?> GetCustomerByUserIdAsync(
        int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<CustomerInfoDto>(
            "sp_GetCustomerByUserId",
            new
            {
                UserId = userId
            },
            commandType: CommandType.StoredProcedure);
    }

    // ================= DASHBOARD =================

    public async Task<CustomerDashboardSummaryDto?>
        GetDashboardSummaryAsync(int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection
            .QueryFirstOrDefaultAsync<CustomerDashboardSummaryDto>(
                "sp_GetCustomerDashboardSummary",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);
    }

    public async Task<UpcomingBookingDto?> GetUpcomingBookingAsync(
        int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection
            .QueryFirstOrDefaultAsync<UpcomingBookingDto>(
                "sp_GetCustomerUpcomingBooking",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);
    }

    public async Task<List<RecentBookingDto>> GetRecentBookingsAsync(
        int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var result =
            await connection.QueryAsync<RecentBookingDto>(
                "sp_GetCustomerRecentBookings",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);

        return result.ToList();
    }

    public async Task<List<CustomerNotificationDto>>
        GetNotificationsAsync(int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var result =
            await connection.QueryAsync<CustomerNotificationDto>(
                "sp_GetCustomerNotifications",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);

        return result.ToList();
    }

    public async Task<List<RecommendedServiceDto>>
        GetRecommendedServicesAsync(int top)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var result =
            await connection.QueryAsync<RecommendedServiceDto>(
                "sp_GetActiveServicesTop",
                new
                {
                    Top = top
                },
                commandType: CommandType.StoredProcedure);

        return result.ToList();
    }

    // ================= PROFILE =================

    public async Task<CustomerProfileDto?> GetProfileAsync(
        int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection
            .QueryFirstOrDefaultAsync<CustomerProfileDto>(
                "sp_GetCustomerByUserId",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);
    }

    public async Task<bool> UpdateProfileAsync(
        int userId,
        UpdateCustomerProfileDto request)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var customer =
            await connection.QueryFirstOrDefaultAsync<CustomerProfileDto>(
                "sp_GetCustomerByUserId",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);

        if (customer == null)
        {
            return false;
        }

        var affectedRows =
            await connection.ExecuteAsync(
                "sp_UpdateCustomer",
                new
                {
                    CustomerId = customer.CustomerId,
                    request.CustomerType,
                    request.CompanyName,
                    request.TaxNumber,
                    request.DateOfBirth,
                    request.Gender,
                    request.PreferredLanguage,
                    request.Notes,
                    request.IsActive
                },
                commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }

    // ================= MY BOOKINGS =================

    public async Task<List<CustomerBookingDto>> GetMyBookingsAsync(
        int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var result =
            await connection.QueryAsync<CustomerBookingDto>(
                "sp_GetCustomerBookings",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);

        return result.ToList();
    }

    // ================= BOOKING DETAILS =================

    public async Task<CustomerBookingDto?> GetBookingAsync(
        int userId,
        int bookingId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection
            .QueryFirstOrDefaultAsync<CustomerBookingDto>(
                "sp_GetCustomerBookingById",
                new
                {
                    UserId = userId,
                    BookingId = bookingId
                },
                commandType: CommandType.StoredProcedure);
    }

    // ================= CANCEL BOOKING =================

    public async Task<bool> CancelBookingAsync(
        int userId,
        int bookingId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var affectedRows =
            await connection.QuerySingleAsync<int>(
                "sp_CancelCustomerBooking",
                new
                {
                    UserId = userId,
                    BookingId = bookingId
                },
                commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
}