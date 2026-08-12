namespace CityHomeServicesFix.Shared.DTOs.Booking;

public class BookingListDto
{
    public int RequestId { get; set; }

    public string RequestNumber { get; set; } = string.Empty;

    public string ServiceName { get; set; } = string.Empty;

    public DateTime? PreferredVisitDate { get; set; }

    public string Status { get; set; } = string.Empty;

    public decimal? EstimatedCost { get; set; }
}