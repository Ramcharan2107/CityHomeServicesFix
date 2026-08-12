namespace CityHomeServicesFix.Shared.DTOs.Technician;

public class UpdateTechnicianStatusDto
{
    public bool IsAvailable { get; set; }

    public string CurrentStatus { get; set; } = string.Empty;
}