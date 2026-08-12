namespace CityHomeServicesFix.Shared.DTOs.JobProgress;

public class UpdateJobProgressDto
{
    public string ProgressStatus { get; set; } = string.Empty;

    public string? ProgressNote { get; set; }
}