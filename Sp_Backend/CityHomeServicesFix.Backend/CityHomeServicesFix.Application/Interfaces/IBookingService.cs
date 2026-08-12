using CityHomeServicesFix.Shared.DTOs.Booking;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IBookingService
{
    Task<List<BookingListDto>> GetMyBookingsAsync(int userId);

    Task<BookingDetailsDto?> GetBookingByIdAsync(
        int requestId,
        int userId);

    Task<bool> CancelBookingAsync(
        int requestId,
        int userId);
}