using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.JobAssignment;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class JobAssignmentRepository : IJobAssignmentRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public JobAssignmentRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<int?> CreateAsync(
        int assignedBy,
        CreateJobAssignmentDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add(
            "@RequestId",
            request.RequestId);

        parameters.Add(
            "@TechnicianId",
            request.TechnicianId);

        parameters.Add(
            "@AssignedBy",
            assignedBy);

        parameters.Add(
            "@ScheduledStart",
            request.ScheduledStart);

        parameters.Add(
            "@ScheduledEnd",
            request.ScheduledEnd);

        parameters.Add(
            "@Remarks",
            request.Remarks);

        parameters.Add(
            "@NewAssignmentId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateJobAssignment",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>(
            "@NewAssignmentId");
    }

    public async Task<List<JobAssignmentDto>> GetAllAsync()
    {
        using var connection = _connectionFactory.CreateConnection();

        var assignments =
            await connection.QueryAsync<JobAssignmentDto>(
                "sp_GetAllJobAssignments",
                commandType: CommandType.StoredProcedure);

        return assignments.ToList();
    }

    public async Task<JobAssignmentDto?> GetByIdAsync(
        int assignmentId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<JobAssignmentDto>(
            "sp_GetJobAssignmentById",
            new
            {
                AssignmentId = assignmentId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<List<JobAssignmentDto>> GetByRequestIdAsync(
        int requestId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var assignments =
            await connection.QueryAsync<JobAssignmentDto>(
                "sp_GetJobAssignmentsByRequestId",
                new
                {
                    RequestId = requestId
                },
                commandType: CommandType.StoredProcedure);

        return assignments.ToList();
    }

    public async Task<List<JobAssignmentDto>> GetByTechnicianIdAsync(
        int technicianId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var assignments =
            await connection.QueryAsync<JobAssignmentDto>(
                "sp_GetJobAssignmentsByTechnicianId",
                new
                {
                    TechnicianId = technicianId
                },
                commandType: CommandType.StoredProcedure);

        return assignments.ToList();
    }

    public async Task<bool> UpdateAsync(
        int assignmentId,
        UpdateJobAssignmentDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_UpdateJobAssignment",
            new
            {
                AssignmentId = assignmentId,
                request.TechnicianId,
                request.ScheduledStart,
                request.ScheduledEnd,
                request.Status,
                request.Remarks
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(
        int assignmentId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_DeleteJobAssignment",
            new
            {
                AssignmentId = assignmentId
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
}