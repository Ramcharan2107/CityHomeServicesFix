using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.JobProgress;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class JobProgressRepository : IJobProgressRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public JobProgressRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<int?> CreateAsync(
        int updatedBy,
        CreateJobProgressDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add(
            "@AssignmentId",
            request.AssignmentId);

        parameters.Add(
            "@ProgressStatus",
            request.ProgressStatus);

        parameters.Add(
            "@ProgressNote",
            request.ProgressNote);

        parameters.Add(
            "@UpdatedBy",
            updatedBy);

        parameters.Add(
            "@NewProgressId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateJobProgress",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>(
            "@NewProgressId");
    }

    public async Task<List<JobProgressDto>> GetAllAsync()
    {
        using var connection = _connectionFactory.CreateConnection();

        var progress =
            await connection.QueryAsync<JobProgressDto>(
                "sp_GetAllJobProgress",
                commandType: CommandType.StoredProcedure);

        return progress.ToList();
    }

    public async Task<JobProgressDto?> GetByIdAsync(
        int progressId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<JobProgressDto>(
            "sp_GetJobProgressById",
            new
            {
                ProgressId = progressId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<List<JobProgressDto>> GetByAssignmentIdAsync(
        int assignmentId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var progress =
            await connection.QueryAsync<JobProgressDto>(
                "sp_GetJobProgressByAssignmentId",
                new
                {
                    AssignmentId = assignmentId
                },
                commandType: CommandType.StoredProcedure);

        return progress.ToList();
    }

    public async Task<bool> UpdateAsync(
        int progressId,
        UpdateJobProgressDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_UpdateJobProgress",
            new
            {
                ProgressId = progressId,
                request.ProgressStatus,
                request.ProgressNote
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(
        int progressId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_DeleteJobProgress",
            new
            {
                ProgressId = progressId
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
}