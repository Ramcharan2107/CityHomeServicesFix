namespace CityHomeServicesFix.Shared.DTOs.Technician;

public class TechnicianDto
{
    public int TechnicianId { get; set; }

    public int UserId { get; set; }

    public string EmployeeCode { get; set; } = string.Empty;

    public string? Department { get; set; }

    public string? Designation { get; set; }

    public int? ExperienceYears { get; set; }

    public DateTime? JoiningDate { get; set; }

    public decimal? HourlyRate { get; set; }

    public bool IsAvailable { get; set; }

    public string? CurrentStatus { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}