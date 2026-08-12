namespace CityHomeServicesFix.Shared.DTOs.Technician;

public class CreateTechnicianDto
{
    public int UserId { get; set; }

    public string EmployeeCode { get; set; } = string.Empty;

    public string? Department { get; set; }

    public string? Designation { get; set; }

    public int? ExperienceYears { get; set; }

    public DateTime? JoiningDate { get; set; }

    public decimal? HourlyRate { get; set; }
}