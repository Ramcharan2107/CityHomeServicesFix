using CityHomeServicesFix.Shared.DTOs.ServiceRequest;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IServiceRequestRepository
{
    Task<int?> CreateAsync(
        int userId,
        CreateServiceRequestDto request);

    Task<bool> DeleteAsync(
        int requestId,
        int userId);

    Task<List<ServiceRequestDto>> GetByCustomerAsync(
        int userId);

    Task<ServiceRequestDto?> GetByIdAsync(
        int requestId,
        int userId);
    Task<List<ServiceRequestDto>> GetAllAsync();
}