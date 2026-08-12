namespace CityHomeServicesFix.Shared.DTOs.Booking;

public class BookingDetailsDto
{
    public int RequestId { get; set; }

    public string RequestNumber { get; set; } = string.Empty;

    public string ServiceName { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Status { get; set; } = string.Empty;

    public string Priority { get; set; } = string.Empty;

    public DateTime? PreferredVisitDate { get; set; }

    public decimal? EstimatedCost { get; set; }

    public string CustomerName { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}