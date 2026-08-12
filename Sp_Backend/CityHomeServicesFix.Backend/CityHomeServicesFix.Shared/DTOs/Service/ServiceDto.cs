namespace CityHomeServicesFix.Shared.DTOs.Service;

public class ServiceDto
{
    public int ServiceId { get; set; }

    public int CategoryId { get; set; }

    public string ServiceName { get; set; } = string.Empty;

    public string ServiceCode { get; set; } = string.Empty;

    public string? Description { get; set; }

    public decimal? EstimatedHours { get; set; }

    public decimal? BasePrice { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}