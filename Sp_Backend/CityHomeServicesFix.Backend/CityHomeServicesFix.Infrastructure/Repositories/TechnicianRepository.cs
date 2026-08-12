using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.Technician;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class TechnicianRepository : ITechnicianRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public TechnicianRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<TechnicianDto>> GetAllAsync()
    {
        using var connection = _connectionFactory.CreateConnection();

        var technicians =
            await connection.QueryAsync<TechnicianDto>(
                "sp_GetAllTechnicians",
                commandType: CommandType.StoredProcedure);

        return technicians.ToList();
    }

    public async Task<TechnicianDto?> GetByIdAsync(
        int technicianId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<TechnicianDto>(
            "sp_GetTechnicianById",
            new
            {
                TechnicianId = technicianId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<TechnicianDto?> GetByUserIdAsync(
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<TechnicianDto>(
            "sp_GetTechnicianByUserId",
            new
            {
                UserId = userId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<List<TechnicianDto>> GetAvailableAsync()
    {
        using var connection = _connectionFactory.CreateConnection();

        var technicians =
            await connection.QueryAsync<TechnicianDto>(
                "sp_GetAvailableTechnicians",
                commandType: CommandType.StoredProcedure);

        return technicians.ToList();
    }

    public async Task<bool> SetStatusAsync(
        int technicianId,
        UpdateTechnicianStatusDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var affectedRows = await connection.ExecuteAsync(
            "sp_SetTechnicianStatus",
            new
            {
                TechnicianId = technicianId,
                request.IsAvailable,
                request.CurrentStatus
            },
            commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
    public async Task<int?> CreateAsync(
    CreateTechnicianDto request)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add("@UserId", request.UserId);
        parameters.Add("@EmployeeCode", request.EmployeeCode);
        parameters.Add("@Department", request.Department);
        parameters.Add("@Designation", request.Designation);
        parameters.Add("@ExperienceYears", request.ExperienceYears);
        parameters.Add("@JoiningDate", request.JoiningDate);
        parameters.Add("@HourlyRate", request.HourlyRate);

        parameters.Add(
            "@NewTechnicianId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateTechnician",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>(
            "@NewTechnicianId");
    }
    public async Task<bool> UpdateAsync(
    int technicianId,
    UpdateTechnicianDto request)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var affectedRows =
            await connection.ExecuteAsync(
                "sp_UpdateTechnician",
                new
                {
                    TechnicianId = technicianId,
                    request.EmployeeCode,
                    request.Department,
                    request.Designation,
                    request.ExperienceYears,
                    request.JoiningDate,
                    request.HourlyRate,
                    request.IsAvailable,
                    request.CurrentStatus
                },
                commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
    public async Task<bool> DeleteAsync(
    int technicianId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var affectedRows =
            await connection.ExecuteAsync(
                "sp_DeleteTechnician",
                new
                {
                    TechnicianId = technicianId
                },
                commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
}