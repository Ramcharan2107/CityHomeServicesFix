using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.Customer;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class CustomerAddressRepository : ICustomerAddressRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CustomerAddressRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<CustomerAddressDto>> GetMyAddressesAsync(
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var customer = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerByUserId",
            new { UserId = userId },
            commandType: CommandType.StoredProcedure);

        if (customer == null)
            return new List<CustomerAddressDto>();

        var addresses =
            await connection.QueryAsync<CustomerAddressDto>(
                "sp_GetCustomerAddressesByCustomerId",
                new { CustomerId = (int)customer.CustomerId },
                commandType: CommandType.StoredProcedure);

        return addresses.ToList();
    }

    public async Task<CustomerAddressDto?> GetAddressByIdAsync(
        int addressId,
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var customer = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerByUserId",
            new { UserId = userId },
            commandType: CommandType.StoredProcedure);

        if (customer == null)
            return null;

        var address =
            await connection.QueryFirstOrDefaultAsync<CustomerAddressDto>(
                "sp_GetCustomerAddressById",
                new { AddressId = addressId },
                commandType: CommandType.StoredProcedure);

        if (address == null ||
            address.CustomerId != (int)customer.CustomerId)
        {
            return null;
        }

        return address;
    }

    public async Task<int?> CreateAddressAsync(
        int userId,
        CustomerAddressRequestDto request)
    {
        using var connection = _connectionFactory.CreateConnection();

        var customer = await connection.QueryFirstOrDefaultAsync<dynamic>(
            "sp_GetCustomerByUserId",
            new { UserId = userId },
            commandType: CommandType.StoredProcedure);

        if (customer == null)
            return null;

        var parameters = new DynamicParameters();

        parameters.Add(
            "@CustomerId",
            (int)customer.CustomerId);

        parameters.Add(
            "@AddressType",
            request.AddressType);

        parameters.Add(
            "@AddressLine1",
            request.AddressLine1);

        parameters.Add(
            "@AddressLine2",
            request.AddressLine2);

        parameters.Add(
            "@City",
            request.City);

        parameters.Add(
            "@State",
            request.State);

        parameters.Add(
            "@Country",
            request.Country);

        parameters.Add(
            "@PostalCode",
            request.PostalCode);

        parameters.Add(
            "@Latitude",
            request.Latitude);

        parameters.Add(
            "@Longitude",
            request.Longitude);

        parameters.Add(
            "@IsDefault",
            request.IsDefault);

        parameters.Add(
            "@NewAddressId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateCustomerAddress",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>("@NewAddressId");
    }

    public async Task<bool> UpdateAddressAsync(
        int addressId,
        int userId,
        CustomerAddressRequestDto request)
    {
        var address =
            await GetAddressByIdAsync(addressId, userId);

        if (address == null)
            return false;

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            "sp_UpdateCustomerAddress",
            new
            {
                AddressId = addressId,
                request.AddressType,
                request.AddressLine1,
                request.AddressLine2,
                request.City,
                request.State,
                request.Country,
                request.PostalCode,
                request.Latitude,
                request.Longitude,
                request.IsDefault
            },
            commandType: CommandType.StoredProcedure);

        return true;
    }

    public async Task<bool> DeleteAddressAsync(
        int addressId,
        int userId)
    {
        var address =
            await GetAddressByIdAsync(addressId, userId);

        if (address == null)
            return false;

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            "sp_DeleteCustomerAddress",
            new { AddressId = addressId },
            commandType: CommandType.StoredProcedure);

        return true;
    }

    public async Task<bool> SetDefaultAddressAsync(
        int addressId,
        int userId,
        bool isDefault)
    {
        var address =
            await GetAddressByIdAsync(addressId, userId);

        if (address == null)
            return false;

        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            "sp_SetCustomerAddressDefault",
            new
            {
                AddressId = addressId,
                IsDefault = isDefault
            },
            commandType: CommandType.StoredProcedure);

        return true;
    }
}