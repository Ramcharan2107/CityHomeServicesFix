using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.User;

namespace CityHomeServicesFix.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(
        IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<UserDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<UserDto?> GetByIdAsync(
        int userId)
    {
        return await _repository.GetByIdAsync(userId);
    }

    public async Task<bool> UpdateAsync(
        int userId,
        UpdateUserDto request)
    {
        return await _repository.UpdateAsync(
            userId,
            request);
    }

    public async Task<bool> DeleteAsync(
        int userId)
    {
        return await _repository.DeleteAsync(userId);
    }
}