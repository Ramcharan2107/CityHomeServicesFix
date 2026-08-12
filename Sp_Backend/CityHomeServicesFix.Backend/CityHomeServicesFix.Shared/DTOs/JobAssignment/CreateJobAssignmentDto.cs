namespace CityHomeServicesFix.Shared.DTOs.JobAssignment;

public class CreateJobAssignmentDto
{
    public int RequestId { get; set; }

    public int TechnicianId { get; set; }

    public DateTime? ScheduledStart { get; set; }

    public DateTime? ScheduledEnd { get; set; }

    public string? Remarks { get; set; }
}