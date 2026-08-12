namespace CityHomeServicesFix.Shared.DTOs.Customer;

public class CustomerDashboardDto
{
    public string CustomerName { get; set; } = string.Empty;

    public int TotalBookings { get; set; }

    public int PendingBookings { get; set; }

    public int CompletedBookings { get; set; }

    public int TotalAddresses { get; set; }

    public UpcomingBookingDto? UpcomingBooking { get; set; }

    public List<RecentBookingDto> RecentBookings { get; set; } = new();

    public List<CustomerNotificationDto> Notifications { get; set; } = new();

    public List<RecommendedServiceDto> RecommendedServices { get; set; } = new();
}

public class UpcomingBookingDto
{
    public int ServiceRequestId { get; set; }

    public string ServiceName { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public DateTime? BookingDate { get; set; }

    public decimal EstimatedCost { get; set; }

    public string TechnicianName { get; set; } = "Not Assigned";
}

public class RecentBookingDto
{
    public int ServiceRequestId { get; set; }

    public string ServiceName { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public DateTime? BookingDate { get; set; }

    public decimal EstimatedCost { get; set; }
}

public class CustomerNotificationDto
{
    public int NotificationId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public bool IsRead { get; set; }
}

public class RecommendedServiceDto
{
    public int ServiceId { get; set; }

    public string ServiceName { get; set; } = string.Empty;

    public decimal BasePrice { get; set; }

    public decimal EstimatedHours { get; set; }

    public string CategoryName { get; set; } = string.Empty;
}