namespace CityHomeServicesFix.Shared.DTOs.ServiceRequest;

public class CreateServiceRequestDto
{
    public int ServiceId { get; set; }

    public string Priority { get; set; } = "Medium";

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime? PreferredVisitDate { get; set; }

    public decimal? EstimatedCost { get; set; }

    public int AddressId { get; set; }
}