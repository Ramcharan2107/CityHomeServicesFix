using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Booking;

namespace CityHomeServicesFix.Application.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _bookingRepository;

    public BookingService(IBookingRepository bookingRepository)
    {
        _bookingRepository = bookingRepository;
    }

    public async Task<List<BookingListDto>> GetMyBookingsAsync(int userId)
    {
        return await _bookingRepository.GetMyBookingsAsync(userId);
    }

    public async Task<BookingDetailsDto?> GetBookingByIdAsync(
        int requestId,
        int userId)
    {
        return await _bookingRepository.GetBookingByIdAsync(
            requestId,
            userId);
    }

    public async Task<bool> CancelBookingAsync(
        int requestId,
        int userId)
    {
        return await _bookingRepository.CancelBookingAsync(
            requestId,
            userId);
    }
}