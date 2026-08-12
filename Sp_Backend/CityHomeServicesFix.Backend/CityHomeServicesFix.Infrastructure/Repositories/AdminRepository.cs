using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.Admin;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class AdminRepository : IAdminRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public AdminRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<AdminDashboardDto> GetDashboardAsync()
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var result =
            await connection.QueryFirstOrDefaultAsync<AdminDashboardDto>(
                "sp_GetAdminDashboardSummary",
                commandType: CommandType.StoredProcedure);

        return result ?? new AdminDashboardDto();
    }
}