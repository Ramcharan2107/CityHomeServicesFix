using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.Service;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class ServiceRepository : IServiceRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ServiceRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<ServiceDto>> GetAllAsync()
    {
        using var connection = _connectionFactory.CreateConnection();

        var services = await connection.QueryAsync<ServiceDto>(
            "sp_GetAllServices",
            commandType: CommandType.StoredProcedure);

        return services.ToList();
    }

    public async Task<ServiceDto?> GetByIdAsync(int serviceId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<ServiceDto>(
            "sp_GetServiceById",
            new
            {
                ServiceId = serviceId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<List<ActiveServiceDto>> GetActiveTopAsync(int top)
    {
        using var connection = _connectionFactory.CreateConnection();

        var services = await connection.QueryAsync<ActiveServiceDto>(
            "sp_GetActiveServicesTop",
            new
            {
                Top = top
            },
            commandType: CommandType.StoredProcedure);

        return services.ToList();
    }
}