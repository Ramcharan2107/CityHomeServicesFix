using Dapper;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Shared.DTOs.User;
using System.Data;

namespace CityHomeServicesFix.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public UserRepository(
        IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<UserDto>> GetAllAsync()
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var users =
            await connection.QueryAsync<UserDto>(
                "sp_GetAllUsers",
                commandType: CommandType.StoredProcedure);

        return users.ToList();
    }

    public async Task<UserDto?> GetByIdAsync(
        int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        return await connection
            .QueryFirstOrDefaultAsync<UserDto>(
                "sp_GetUserById",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);
    }

    public async Task<bool> UpdateAsync(
        int userId,
        UpdateUserDto request)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var affectedRows =
            await connection.ExecuteAsync(
                "sp_UpdateUser",
                new
                {
                    UserId = userId,
                    request.FirstName,
                    request.LastName,
                    request.UserName,
                    request.PhoneNumber,
                    request.ProfileImageUrl
                },
                commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(
        int userId)
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var affectedRows =
            await connection.ExecuteAsync(
                "sp_DeleteUser",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
    }
}