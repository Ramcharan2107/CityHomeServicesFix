using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.ReportActivity;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class ReportActivityRepository : IReportActivityRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ReportActivityRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<int?> CreateAsync(
        CreateReportActivityDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add(
            "@ReportId",
            request.ReportId);

        parameters.Add(
            "@ActivityDescription",
            request.ActivityDescription);

        parameters.Add(
            "@TimeSpentHours",
            request.TimeSpentHours);

        parameters.Add(
            "@NewActivityId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateReportActivity",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>(
            "@NewActivityId");
    }

    public async Task<List<ReportActivityDto>> GetAllAsync()
    {
        using var connection = _connectionFactory.CreateConnection();

        var activities =
            await connection.QueryAsync<ReportActivityDto>(
                "sp_GetAllReportActivities",
                commandType: CommandType.StoredProcedure);

        return activities.ToList();
    }

    public async Task<ReportActivityDto?> GetByIdAsync(
        int activityId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<ReportActivityDto>(
            "sp_GetReportActivityById",
            new
            {
                ActivityId = activityId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<List<ReportActivityDto>> GetByReportIdAsync(
        int reportId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var activities =
            await connection.QueryAsync<ReportActivityDto>(
                "sp_GetReportActivitiesByReportId",
                new
                {
                    ReportId = reportId
                },
                commandType: CommandType.StoredProcedure);

        return activities.ToList();
    }

    public async Task<bool> UpdateAsync(
        int activityId,
        UpdateReportActivityDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_UpdateReportActivity",
            new
            {
                ActivityId = activityId,
                request.ActivityDescription,
                request.TimeSpentHours
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(
        int activityId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_DeleteReportActivity",
            new
            {
                ActivityId = activityId
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
}