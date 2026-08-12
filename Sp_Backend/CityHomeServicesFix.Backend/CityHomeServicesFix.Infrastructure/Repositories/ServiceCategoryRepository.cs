using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.ServiceCategory;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class ServiceCategoryRepository : IServiceCategoryRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ServiceCategoryRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<ServiceCategoryDto>> GetAllAsync()
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var categories =
            await connection.QueryAsync<ServiceCategoryDto>(
                "sp_GetAllServiceCategories",
                commandType: CommandType.StoredProcedure);

        return categories.ToList();
    }

    public async Task<ServiceCategoryDto?> GetByIdAsync(
        int categoryId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection
            .QueryFirstOrDefaultAsync<ServiceCategoryDto>(
                "sp_GetServiceCategoryById",
                new
                {
                    CategoryId = categoryId
                },
                commandType: CommandType.StoredProcedure);
    }
}