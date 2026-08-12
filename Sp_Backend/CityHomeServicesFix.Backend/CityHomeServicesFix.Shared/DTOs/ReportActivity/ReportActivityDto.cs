namespace CityHomeServicesFix.Shared.DTOs.ReportActivity;

public class ReportActivityDto
{
    public int ActivityId { get; set; }

    public int ReportId { get; set; }

    public string ActivityDescription { get; set; } = string.Empty;

    public decimal? TimeSpentHours { get; set; }

    public DateTime CreatedAt { get; set; }
}