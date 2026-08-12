namespace CityHomeServicesFix.Shared.DTOs.ReportActivity;

public class CreateReportActivityDto
{
    public int ReportId { get; set; }

    public string ActivityDescription { get; set; } = string.Empty;

    public decimal? TimeSpentHours { get; set; }
}