using CityHomeServicesFix.Shared.DTOs.Service;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IServiceRepository
{
    Task<List<ServiceDto>> GetAllAsync();

    Task<ServiceDto?> GetByIdAsync(int serviceId);

    Task<List<ActiveServiceDto>> GetActiveTopAsync(int top);
}