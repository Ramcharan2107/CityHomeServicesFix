namespace CityHomeServicesFix.Shared.DTOs.JobProgress;

public class CreateJobProgressDto
{
    public int AssignmentId { get; set; }

    public string ProgressStatus { get; set; } = string.Empty;

    public string? ProgressNote { get; set; }
}