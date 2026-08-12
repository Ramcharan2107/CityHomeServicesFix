using CityHomeServicesFix.Shared.DTOs.Technician;

namespace CityHomeServicesFix.Application.Interfaces;

public interface ITechnicianRepository
{
    Task<List<TechnicianDto>> GetAllAsync();

    Task<TechnicianDto?> GetByIdAsync(int technicianId);

    Task<TechnicianDto?> GetByUserIdAsync(int userId);

    Task<List<TechnicianDto>> GetAvailableAsync();

    Task<bool> SetStatusAsync(
        int technicianId,
        UpdateTechnicianStatusDto request);
    Task<int?> CreateAsync(CreateTechnicianDto request);

    Task<bool> UpdateAsync(
        int technicianId,
        UpdateTechnicianDto request);

    Task<bool> DeleteAsync(int technicianId);
}