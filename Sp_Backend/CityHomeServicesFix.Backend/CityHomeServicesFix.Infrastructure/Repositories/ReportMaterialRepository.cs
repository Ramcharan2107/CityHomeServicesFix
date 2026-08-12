using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.ReportMaterial;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class ReportMaterialRepository : IReportMaterialRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ReportMaterialRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<int?> CreateAsync(
        CreateReportMaterialDto request)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add(
            "@ReportId",
            request.ReportId);

        parameters.Add(
            "@MaterialName",
            request.MaterialName);

        parameters.Add(
            "@Quantity",
            request.Quantity);

        parameters.Add(
            "@Unit",
            request.Unit);

        parameters.Add(
            "@UnitPrice",
            request.UnitPrice);

        parameters.Add(
            "@NewMaterialId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateReportMaterial",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>(
            "@NewMaterialId");
    }

    public async Task<List<ReportMaterialDto>> GetAllAsync()
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var materials =
            await connection.QueryAsync<ReportMaterialDto>(
                "sp_GetAllReportMaterials",
                commandType: CommandType.StoredProcedure);

        return materials.ToList();
    }

    public async Task<ReportMaterialDto?> GetByIdAsync(
        int materialId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection
            .QueryFirstOrDefaultAsync<ReportMaterialDto>(
                "sp_GetReportMaterialById",
                new
                {
                    MaterialId = materialId
                },
                commandType: CommandType.StoredProcedure);
    }

    public async Task<List<ReportMaterialDto>> GetByReportIdAsync(
        int reportId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var materials =
            await connection.QueryAsync<ReportMaterialDto>(
                "sp_GetReportMaterialsByReportId",
                new
                {
                    ReportId = reportId
                },
                commandType: CommandType.StoredProcedure);

        return materials.ToList();
    }

    public async Task<bool> UpdateAsync(
        int materialId,
        UpdateReportMaterialDto request)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var affectedRows =
            await connection.ExecuteAsync(
                "sp_UpdateReportMaterial",
                new
                {
                    MaterialId = materialId,
                    request.MaterialName,
                    request.Quantity,
                    request.Unit,
                    request.UnitPrice
                },
                commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(
        int materialId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var affectedRows =
            await connection.ExecuteAsync(
                "sp_DeleteReportMaterial",
                new
                {
                    MaterialId = materialId
                },
                commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
}