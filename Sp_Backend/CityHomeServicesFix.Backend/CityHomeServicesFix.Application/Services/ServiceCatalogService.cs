using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Service;

namespace CityHomeServicesFix.Application.Services;

public class ServiceCatalogService : IServiceCatalogService
{
    private readonly IServiceRepository _repository;

    public ServiceCatalogService(IServiceRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ServiceDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<ServiceDto?> GetByIdAsync(int serviceId)
    {
        return await _repository.GetByIdAsync(serviceId);
    }

    public async Task<List<ActiveServiceDto>> GetActiveTopAsync(int top)
    {
        if (top <= 0)
            top = 5;

        if (top > 50)
            top = 50;

        return await _repository.GetActiveTopAsync(top);
    }
}