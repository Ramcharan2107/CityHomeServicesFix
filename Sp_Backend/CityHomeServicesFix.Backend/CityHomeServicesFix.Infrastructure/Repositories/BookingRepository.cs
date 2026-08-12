using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.Booking;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public BookingRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<BookingListDto>> GetMyBookingsAsync(int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var customer = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerByUserId",
            new { UserId = userId },
            commandType: CommandType.StoredProcedure);

        if (customer == null)
            return new List<BookingListDto>();

        var bookings = await connection.QueryAsync<BookingListDto>(
            "sp_GetServiceRequestsByCustomerId",
            new { CustomerId = (int)customer.CustomerId },
            commandType: CommandType.StoredProcedure);

        return bookings.ToList();
    }

    public async Task<BookingDetailsDto?> GetBookingByIdAsync(
        int requestId,
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var customer = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerByUserId",
            new { UserId = userId },
            commandType: CommandType.StoredProcedure);

        if (customer == null)
            return null;

        var booking = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetServiceRequestById",
            new { RequestId = requestId },
            commandType: CommandType.StoredProcedure);

        if (booking == null)
            return null;

        if ((int)booking.CustomerId != (int)customer.CustomerId)
            return null;

        return new BookingDetailsDto
        {
            RequestId = booking.RequestId,
            RequestNumber = booking.RequestNumber,
            ServiceName = booking.ServiceName ?? string.Empty,
            Title = booking.Title ?? string.Empty,
            Description = booking.Description,
            Status = booking.Status ?? string.Empty,
            Priority = booking.Priority ?? string.Empty,
            PreferredVisitDate = booking.PreferredVisitDate,
            EstimatedCost = booking.EstimatedCost,
            CustomerName = booking.CustomerName ?? string.Empty,
            Address = booking.Address ?? string.Empty
        };
    }

    public async Task<bool> CancelBookingAsync(
        int requestId,
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var customer = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerByUserId",
            new { UserId = userId },
            commandType: CommandType.StoredProcedure);

        if (customer == null)
            return false;

        var booking = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetServiceRequestById",
            new { RequestId = requestId },
            commandType: CommandType.StoredProcedure);

        if (booking == null)
            return false;

        if ((int)booking.CustomerId != (int)customer.CustomerId)
            return false;

        if ((string)booking.Status != "Pending")
            return false;

        await connection.ExecuteAsync(
            "sp_UpdateServiceRequestStatus",
            new
            {
                RequestId = requestId,
                Status = "Cancelled"
            },
            commandType: CommandType.StoredProcedure);

        return true;
    }
}