using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Technician;

namespace CityHomeServicesFix.Application.Services;

public class TechnicianService : ITechnicianService
{
    private readonly ITechnicianRepository _repository;

    public TechnicianService(
        ITechnicianRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<TechnicianDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<TechnicianDto?> GetByIdAsync(
        int technicianId)
    {
        return await _repository.GetByIdAsync(
            technicianId);
    }

    public async Task<TechnicianDto?> GetByUserIdAsync(
        int userId)
    {
        return await _repository.GetByUserIdAsync(
            userId);
    }

    public async Task<List<TechnicianDto>> GetAvailableAsync()
    {
        return await _repository.GetAvailableAsync();
    }

    public async Task<bool> SetStatusAsync(
        int technicianId,
        UpdateTechnicianStatusDto request)
    {
        return await _repository.SetStatusAsync(
            technicianId,
            request);
    }
    public async Task<int?> CreateAsync(
    CreateTechnicianDto request)
    {
        return await _repository.CreateAsync(request);
    }

    public async Task<bool> UpdateAsync(
        int technicianId,
        UpdateTechnicianDto request)
    {
        return await _repository.UpdateAsync(
            technicianId,
            request);
    }

    public async Task<bool> DeleteAsync(
        int technicianId)
    {
        return await _repository.DeleteAsync(
            technicianId);
    }
}