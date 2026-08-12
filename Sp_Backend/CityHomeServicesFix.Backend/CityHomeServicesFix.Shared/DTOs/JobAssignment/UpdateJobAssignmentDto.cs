namespace CityHomeServicesFix.Shared.DTOs.JobAssignment;

public class UpdateJobAssignmentDto
{
    public int TechnicianId { get; set; }

    public DateTime? ScheduledStart { get; set; }

    public DateTime? ScheduledEnd { get; set; }

    public string Status { get; set; } = string.Empty;

    public string? Remarks { get; set; }
}