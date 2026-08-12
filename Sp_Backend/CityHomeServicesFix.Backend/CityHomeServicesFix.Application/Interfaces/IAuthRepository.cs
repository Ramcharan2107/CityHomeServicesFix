using CityHomeServicesFix.Shared.DTOs.Auth;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IAuthRepository
{
    Task<int> CreateUserAsync(
        string firstName,
        string lastName,
        string userName,
        string email,
        string? phoneNumber,
        string passwordHash,
        int roleId);

    Task<AuthUserDto?> GetUserByEmailAsync(string email);

    Task<AuthUserDto?> GetUserByUsernameAsync(string userName);

    Task<AuthUserDto?> GetUserByUsernameOrEmailAsync(
        string usernameOrEmail);

    Task<AuthUserDto?> GetUserByIdAsync(int userId);

    Task<RoleDto?> GetRoleByIdAsync(int roleId);

    Task<int> CreateCustomerAsync(
        int userId,
        string customerCode,
        string customerType,
        string? companyName,
        string? taxNumber,
        DateTime? dateOfBirth,
        string? gender,
        string? preferredLanguage,
        string? notes,
        bool isActive);

    Task UpdateLoginSuccessAsync(int userId);

    Task UpdateLoginFailedAsync(
        int userId,
        DateTime? lockoutEnd);
}