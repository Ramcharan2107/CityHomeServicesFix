namespace CityHomeServicesFix.Shared.DTOs.JobAssignment;

public class JobAssignmentDto
{
    public int AssignmentId { get; set; }

    public int RequestId { get; set; }

    public int TechnicianId { get; set; }

    public int AssignedBy { get; set; }

    public DateTime AssignedDate { get; set; }

    public DateTime? ScheduledStart { get; set; }

    public DateTime? ScheduledEnd { get; set; }

    public string Status { get; set; } = string.Empty;

    public string? Remarks { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}