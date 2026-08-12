using CityHomeServicesFix.Shared.DTOs.Customer;

namespace CityHomeServicesFix.Application.Interfaces;

public interface ICustomerService
{
    Task<CustomerDashboardDto?> GetDashboardAsync(
        int userId);

    Task<CustomerProfileDto?> GetProfileAsync(
        int userId);

    Task<bool> UpdateProfileAsync(
        int userId,
        UpdateCustomerProfileDto request);

    // ================= BOOKING METHODS =================

    Task<List<CustomerBookingDto>> GetMyBookingsAsync(
        int userId);

    Task<CustomerBookingDto?> GetBookingAsync(
        int userId,
        int bookingId);

    Task<bool> CancelBookingAsync(
        int userId,
        int bookingId);
}