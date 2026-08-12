using CityHomeServicesFix.Shared.DTOs.User;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IUserRepository
{
    Task<List<UserDto>> GetAllAsync();

    Task<UserDto?> GetByIdAsync(int userId);

    Task<bool> UpdateAsync(
        int userId,
        UpdateUserDto request);

    Task<bool> DeleteAsync(int userId);
}