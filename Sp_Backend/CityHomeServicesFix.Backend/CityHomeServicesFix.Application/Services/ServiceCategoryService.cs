using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.ServiceCategory;

namespace CityHomeServicesFix.Application.Services;

public class ServiceCategoryService : IServiceCategoryService
{
    private readonly IServiceCategoryRepository _repository;

    public ServiceCategoryService(
        IServiceCategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ServiceCategoryDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<ServiceCategoryDto?> GetByIdAsync(
        int categoryId)
    {
        return await _repository.GetByIdAsync(
            categoryId);
    }
}