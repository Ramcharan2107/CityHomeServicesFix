using CityHomeServicesFix.Shared.DTOs.ServiceCategory;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IServiceCategoryService
{
    Task<List<ServiceCategoryDto>> GetAllAsync();

    Task<ServiceCategoryDto?> GetByIdAsync(
        int categoryId);
}