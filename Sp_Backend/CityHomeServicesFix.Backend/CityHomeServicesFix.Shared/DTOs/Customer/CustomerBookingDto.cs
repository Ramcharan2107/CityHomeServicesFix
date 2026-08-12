namespace CityHomeServicesFix.Shared.DTOs.Customer;

public class CustomerBookingDto
{
    public int BookingId { get; set; }

    public string ServiceName { get; set; } = string.Empty;

    public string CategoryName { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public decimal TotalAmount { get; set; }

    public DateTime BookingDate { get; set; }

    public DateTime? ScheduledDate { get; set; }

    public string? ScheduledTime { get; set; }

    public string? Address { get; set; }

    public string? TechnicianName { get; set; }
}