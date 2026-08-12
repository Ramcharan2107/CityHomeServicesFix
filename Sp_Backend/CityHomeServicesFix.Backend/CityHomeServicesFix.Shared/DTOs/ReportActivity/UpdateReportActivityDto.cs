namespace CityHomeServicesFix.Shared.DTOs.ReportActivity;

public class UpdateReportActivityDto
{
    public string ActivityDescription { get; set; } = string.Empty;

    public decimal? TimeSpentHours { get; set; }
}