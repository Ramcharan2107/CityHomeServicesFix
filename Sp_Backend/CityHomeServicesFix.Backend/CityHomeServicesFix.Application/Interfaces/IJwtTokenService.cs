using CityHomeServicesFix.Shared.DTOs.Auth;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IJwtTokenService
{
    string GenerateToken(
        AuthUserDto user,
        RoleDto role);
}