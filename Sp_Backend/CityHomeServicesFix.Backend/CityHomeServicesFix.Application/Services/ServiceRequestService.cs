using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.ServiceRequest;

namespace CityHomeServicesFix.Application.Services;

public class ServiceRequestService : IServiceRequestService
{
    private readonly IServiceRequestRepository _repository;

    public ServiceRequestService(
        IServiceRequestRepository repository)
    {
        _repository = repository;
    }

    public async Task<int?> CreateAsync(
        int userId,
        CreateServiceRequestDto request)
    {
        return await _repository.CreateAsync(
            userId,
            request);
    }

    public async Task<bool> DeleteAsync(
        int requestId,
        int userId)
    {
        return await _repository.DeleteAsync(
            requestId,
            userId);
    }
    public async Task<List<ServiceRequestDto>> GetByCustomerAsync(
    int userId)
    {
        return await _repository.GetByCustomerAsync(userId);
    }

    public async Task<ServiceRequestDto?> GetByIdAsync(
        int requestId,
        int userId)
    {
        return await _repository.GetByIdAsync(
            requestId,
            userId);
    }
    public async Task<List<ServiceRequestDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }
}