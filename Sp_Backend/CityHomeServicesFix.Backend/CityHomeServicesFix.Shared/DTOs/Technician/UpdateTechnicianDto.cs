namespace CityHomeServicesFix.Shared.DTOs.Technician;

public class UpdateTechnicianDto
{
    public string EmployeeCode { get; set; } = string.Empty;

    public string? Department { get; set; }

    public string? Designation { get; set; }

    public int? ExperienceYears { get; set; }

    public DateTime? JoiningDate { get; set; }

    public decimal? HourlyRate { get; set; }

    public bool IsAvailable { get; set; }

    public string CurrentStatus { get; set; } = string.Empty;
}