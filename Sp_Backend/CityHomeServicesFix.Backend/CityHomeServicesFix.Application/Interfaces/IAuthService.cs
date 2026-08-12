using CityHomeServicesFix.Shared.DTOs.Auth;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);

    Task<AuthResponse> LoginAsync(LoginRequest request);

    Task<UserProfileDto?> GetProfileAsync(int userId);
}