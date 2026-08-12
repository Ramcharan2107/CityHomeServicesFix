namespace CityHomeServicesFix.Shared.DTOs.ServiceRequest;

public class ServiceRequestDto
{
    public int RequestId { get; set; }

    public string RequestNumber { get; set; } = string.Empty;

    public int CustomerId { get; set; }

    public int ServiceId { get; set; }

    public string Priority { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime? PreferredVisitDate { get; set; }

    public DateTime RequestedDate { get; set; }

    public decimal? EstimatedCost { get; set; }

    public int AddressId { get; set; }

    public int CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}