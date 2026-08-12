using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.FinalReport;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class FinalReportRepository : IFinalReportRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public FinalReportRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<int?> CreateAsync(
        int createdBy,
        CreateFinalReportDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add(
            "@AssignmentId",
            request.AssignmentId);

        parameters.Add(
            "@WorkSummary",
            request.WorkSummary);

        parameters.Add(
            "@HoursWorked",
            request.HoursWorked);

        parameters.Add(
            "@TotalCost",
            request.TotalCost);

        parameters.Add(
            "@TechnicianRemarks",
            request.TechnicianRemarks);

        parameters.Add(
            "@CustomerRemarks",
            request.CustomerRemarks);

        parameters.Add(
            "@CustomerSignature",
            request.CustomerSignature);

        parameters.Add(
            "@CreatedBy",
            createdBy);

        parameters.Add(
            "@NewReportId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateFinalReport",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>(
            "@NewReportId");
    }

    public async Task<List<FinalReportDto>> GetAllAsync()
    {
        using var connection = _connectionFactory.CreateConnection();

        var reports =
            await connection.QueryAsync<FinalReportDto>(
                "sp_GetAllFinalReports",
                commandType: CommandType.StoredProcedure);

        return reports.ToList();
    }

    public async Task<FinalReportDto?> GetByIdAsync(
        int reportId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<FinalReportDto>(
            "sp_GetFinalReportById",
            new
            {
                ReportId = reportId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<bool> UpdateAsync(
        int reportId,
        UpdateFinalReportDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_UpdateFinalReport",
            new
            {
                ReportId = reportId,
                request.WorkSummary,
                request.HoursWorked,
                request.TotalCost,
                request.TechnicianRemarks,
                request.CustomerRemarks,
                request.CustomerSignature
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(
        int reportId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_DeleteFinalReport",
            new
            {
                ReportId = reportId
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
}