namespace CityHomeServicesFix.Shared.DTOs.JobProgress;

public class JobProgressDto
{
    public int ProgressId { get; set; }

    public int AssignmentId { get; set; }

    public string ProgressStatus { get; set; } = string.Empty;

    public string? ProgressNote { get; set; }

    public DateTime ProgressTime { get; set; }

    public int UpdatedBy { get; set; }

    public DateTime CreatedAt { get; set; }
}