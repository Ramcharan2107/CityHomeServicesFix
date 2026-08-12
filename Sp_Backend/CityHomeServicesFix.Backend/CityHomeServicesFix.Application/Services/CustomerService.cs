using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Customer;

namespace CityHomeServicesFix.Application.Services;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _customerRepository;

    public CustomerService(
        ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    // ================= DASHBOARD =================

    public async Task<CustomerDashboardDto?> GetDashboardAsync(
        int userId)
    {
        var customer =
            await _customerRepository.GetCustomerByUserIdAsync(userId);

        if (customer == null || !customer.IsActive)
        {
            return null;
        }

        var summary =
            await _customerRepository.GetDashboardSummaryAsync(userId);

        if (summary == null)
        {
            return null;
        }

        var upcomingBooking =
            await _customerRepository.GetUpcomingBookingAsync(userId);

        var recentBookings =
            await _customerRepository.GetRecentBookingsAsync(userId);

        var notifications =
            await _customerRepository.GetNotificationsAsync(userId);

        var recommendedServices =
            await _customerRepository.GetRecommendedServicesAsync(5);

        return new CustomerDashboardDto
        {
            CustomerName = summary.CustomerName,
            TotalBookings = summary.TotalBookings,
            PendingBookings = summary.PendingBookings,
            CompletedBookings = summary.CompletedBookings,
            TotalAddresses = summary.TotalAddresses,
            UpcomingBooking = upcomingBooking,
            RecentBookings = recentBookings,
            Notifications = notifications,
            RecommendedServices = recommendedServices
        };
    }

    // ================= PROFILE =================

    public async Task<CustomerProfileDto?> GetProfileAsync(
        int userId)
    {
        return await _customerRepository.GetProfileAsync(userId);
    }

    public async Task<bool> UpdateProfileAsync(
        int userId,
        UpdateCustomerProfileDto request)
    {
        return await _customerRepository.UpdateProfileAsync(
            userId,
            request);
    }

    // ================= BOOKINGS =================

    public async Task<List<CustomerBookingDto>> GetMyBookingsAsync(
        int userId)
    {
        return await _customerRepository.GetMyBookingsAsync(userId);
    }

    public async Task<CustomerBookingDto?> GetBookingAsync(
        int userId,
        int bookingId)
    {
        return await _customerRepository.GetBookingAsync(
            userId,
            bookingId);
    }

    public async Task<bool> CancelBookingAsync(
        int userId,
        int bookingId)
    {
        return await _customerRepository.CancelBookingAsync(
            userId,
            bookingId);
    }
}