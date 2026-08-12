namespace CityHomeServicesFix.Shared.DTOs.Service;

public class ActiveServiceDto
{
    public int ServiceId { get; set; }

    public string ServiceName { get; set; } = string.Empty;

    public decimal? BasePrice { get; set; }

    public decimal? EstimatedHours { get; set; }

    public string CategoryName { get; set; } = string.Empty;
}