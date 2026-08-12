using CityHomeServicesFix.Shared.DTOs.Customer;

namespace CityHomeServicesFix.Application.Interfaces;

public interface ICustomerRepository
{
    Task<CustomerInfoDto?> GetCustomerByUserIdAsync(
        int userId);

    Task<CustomerDashboardSummaryDto?> GetDashboardSummaryAsync(
        int userId);

    Task<UpcomingBookingDto?> GetUpcomingBookingAsync(
        int userId);

    Task<List<RecentBookingDto>> GetRecentBookingsAsync(
        int userId);

    Task<List<CustomerNotificationDto>> GetNotificationsAsync(
        int userId);

    Task<List<RecommendedServiceDto>> GetRecommendedServicesAsync(
        int top);

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