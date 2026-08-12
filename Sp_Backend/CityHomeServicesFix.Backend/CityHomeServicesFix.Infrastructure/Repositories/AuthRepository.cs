using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.Auth;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public async Task<AuthUserDto?> GetUserByUsernameOrEmailAsync(
    string usernameOrEmail)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<AuthUserDto>(
            "usp_Users_GetByUsernameOrEmail",
            new
            {
                UserNameOrEmail = usernameOrEmail
            },
            commandType: CommandType.StoredProcedure);
    }

    public AuthRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<int> CreateUserAsync(
        string firstName,
        string lastName,
        string userName,
        string email,
        string? phoneNumber,
        string passwordHash,
        int roleId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add("@FirstName", firstName);
        parameters.Add("@LastName", lastName);
        parameters.Add("@UserName", userName);
        parameters.Add("@Email", email);
        parameters.Add("@PhoneNumber", phoneNumber);
        parameters.Add("@PasswordHash", passwordHash);
        parameters.Add("@RoleId", roleId);

        parameters.Add(
            "@NewUserId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateUser",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>("@NewUserId");
    }

    public async Task<AuthUserDto?> GetUserByEmailAsync(
        string email)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<AuthUserDto>(
            "sp_GetUserByEmail",
            new
            {
                Email = email
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<AuthUserDto?> GetUserByUsernameAsync(
        string userName)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<AuthUserDto>(
            "sp_GetUserByUsername",
            new
            {
                UserName = userName
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<AuthUserDto?> GetUserByIdAsync(
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<AuthUserDto>(
            "sp_GetUserById",
            new
            {
                UserId = userId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<RoleDto?> GetRoleByIdAsync(
        int roleId)
    {
        using var connection = _connectionFactory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<RoleDto>(
            "sp_GetRoleById",
            new
            {
                RoleId = roleId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task<int> CreateCustomerAsync(
        int userId,
        string customerCode,
        string customerType,
        string? companyName,
        string? taxNumber,
        DateTime? dateOfBirth,
        string? gender,
        string? preferredLanguage,
        string? notes,
        bool isActive)
    {
        using var connection = _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add("@UserId", userId);
        parameters.Add("@CustomerCode", customerCode);
        parameters.Add("@CustomerType", customerType);
        parameters.Add("@CompanyName", companyName);
        parameters.Add("@TaxNumber", taxNumber);
        parameters.Add("@DateOfBirth", dateOfBirth);
        parameters.Add("@Gender", gender);
        parameters.Add("@PreferredLanguage", preferredLanguage);
        parameters.Add("@Notes", notes);
        parameters.Add("@IsActive", isActive);

        parameters.Add(
            "@NewCustomerId",
            dbType: DbType.Int32,
            direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "sp_CreateCustomer",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>("@NewCustomerId");
    }

    public async Task UpdateLoginSuccessAsync(
        int userId)
    {
        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            "sp_UpdateUserLoginSuccess",
            new
            {
                UserId = userId
            },
            commandType: CommandType.StoredProcedure);
    }

    public async Task UpdateLoginFailedAsync(
        int userId,
        DateTime? lockoutEnd)
    {
        using var connection = _connectionFactory.CreateConnection();

        await connection.ExecuteAsync(
            "sp_UpdateUserLoginFailed",
            new
            {
                UserId = userId,
                LockoutEnd = lockoutEnd
            },
            commandType: CommandType.StoredProcedure);
    }
}