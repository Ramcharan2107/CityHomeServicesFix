using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.ServiceRequest;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class ServiceRequestRepository : IServiceRequestRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public ServiceRequestRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<int?> CreateAsync(
        int userId,
        CreateServiceRequestDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var customer = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerByUserId",
            new
            {
                UserId = userId
            },
            commandType: CommandType.StoredProcedure);

        if (customer == null)
            return null;

        var address = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerAddressById",
            new
            {
                AddressId = request.AddressId
            },
            commandType: CommandType.StoredProcedure);

        if (address == null ||
            (int)address.CustomerId != (int)customer.CustomerId)
        {
            return null;
        }

        var service = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetServiceById",
            new
            {
                ServiceId = request.ServiceId
            },
            commandType: CommandType.StoredProcedure);

        if (service == null || !(bool)service.IsActive)
            return null;

        var requestNumber =
            $"REQ-{DateTime.Now:yyyyMMddHHmmssfff}";

        var parameters = new DynamicParameters();

        parameters.Add(
            "@RequestNumber",
            requestNumber);

        parameters.Add(
            "@CustomerId",
            (int)customer.CustomerId);

        parameters.Add(
            "@ServiceId",
            request.ServiceId);

        parameters.Add(
            "@Priority",
            request.Priority);

        parameters.Add(
            "@Title",
            request.Title);

        parameters.Add(
            "@Description",
            request.Description);

        parameters.Add(
            "@PreferredVisitDate",
            request.PreferredVisitDate);

        parameters.Add(
            "@EstimatedCost",
            request.EstimatedCost);

        parameters.Add(
            "@AddressId",
            request.AddressId);

        parameters.Add(
            "@CreatedBy",
            userId);

        parameters.Add(
            "@NewRequestId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateServiceRequest",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>("@NewRequestId");
    }

    public async Task<bool> DeleteAsync(
        int requestId,
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var customer = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerByUserId",
            new
            {
                UserId = userId
            },
            commandType: CommandType.StoredProcedure);

        if (customer == null)
            return false;

        var request = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetServiceRequestById",
            new
            {
                RequestId = requestId
            },
            commandType: CommandType.StoredProcedure);

        if (request == null ||
            (int)request.CustomerId != (int)customer.CustomerId)
        {
            return false;
        }

        await connection.ExecuteAsync(
            "sp_DeleteServiceRequest",
            new
            {
                RequestId = requestId
            },
            commandType: CommandType.StoredProcedure);

        return true;
    }
    public async Task<List<ServiceRequestDto>> GetByCustomerAsync(
    int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var customer =
            await connection.QueryFirstOrDefaultAsync<dynamic>(
                "sp_GetCustomerByUserId",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);

        if (customer == null)
            return new List<ServiceRequestDto>();

        var requests =
            await connection.QueryAsync<ServiceRequestDto>(
                "sp_GetServiceRequestsByCustomerId",
                new
                {
                    CustomerId = (int)customer.CustomerId
                },
                commandType: CommandType.StoredProcedure);

        return requests.ToList();
    }

    public async Task<ServiceRequestDto?> GetByIdAsync(
        int requestId,
        int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var customer =
            await connection.QueryFirstOrDefaultAsync<dynamic>(
                "sp_GetCustomerByUserId",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);

        if (customer == null)
            return null;

        var request =
            await connection.QueryFirstOrDefaultAsync<ServiceRequestDto>(
                "sp_GetServiceRequestById",
                new
                {
                    RequestId = requestId
                },
                commandType: CommandType.StoredProcedure);

        if (request == null)
            return null;

        if (request.CustomerId != (int)customer.CustomerId)
            return null;

        return request;
    }
    public async Task<List<ServiceRequestDto>> GetAllAsync()
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var requests =
            await connection.QueryAsync<ServiceRequestDto>(
                "sp_GetAllServiceRequests",
                commandType: CommandType.StoredProcedure);

        return requests.ToList();
    }
}