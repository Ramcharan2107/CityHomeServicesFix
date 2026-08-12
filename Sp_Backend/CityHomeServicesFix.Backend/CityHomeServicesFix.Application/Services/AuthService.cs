using BCrypt.Net;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Auth;

namespace CityHomeServicesFix.Application.Services;

public class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepository;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthService(
        IAuthRepository authRepository,
        IJwtTokenService jwtTokenService)
    {
        _authRepository = authRepository;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<AuthResponse> RegisterAsync(
        RegisterRequest request)
    {
        // Check email
        var existingEmail =
            await _authRepository.GetUserByEmailAsync(request.Email);

        if (existingEmail != null)
        {
            return new AuthResponse
            {
                Success = false,
                Message = "Email already exists."
            };
        }

        // Check username
        var existingUsername =
            await _authRepository.GetUserByUsernameAsync(
                request.UserName);

        if (existingUsername != null)
        {
            return new AuthResponse
            {
                Success = false,
                Message = "Username already exists."
            };
        }

        // Hash password
        var passwordHash =
            BCrypt.Net.BCrypt.HashPassword(request.Password);

        // Create user
        var userId =
            await _authRepository.CreateUserAsync(
                request.FirstName,
                request.LastName,
                request.UserName,
                request.Email,
                request.PhoneNumber,
                passwordHash,
                request.RoleId);

        // Automatically create customer profile
        // RoleId 4 = Customer
        if (request.RoleId == 4)
        {
            var customerCode =
                $"CUST{userId:D4}";

            await _authRepository.CreateCustomerAsync(
                userId,
                customerCode,
                "Individual",
                null,
                null,
                null,
                null,
                "English",
                null,
                true);
        }

        return new AuthResponse
        {
            Success = true,
            Message = "Registration Successful"
        };
    }

    public async Task<AuthResponse> LoginAsync(
    LoginRequest request)
    {
        var user =
            await _authRepository.GetUserByUsernameOrEmailAsync(
                request.EmailOrUserName);

        if (user == null)
        {
            return new AuthResponse
            {
                Success = false,
                Message = "Invalid username/email or password."
            };
        }

        // Check active status
        if (!user.IsActive)
        {
            return new AuthResponse
            {
                Success = false,
                Message = "Your account is inactive."
            };
        }

        // Check lockout
        if (user.LockoutEnd.HasValue &&
            user.LockoutEnd.Value > DateTime.UtcNow)
        {
            return new AuthResponse
            {
                Success = false,
                Message =
                    "Account is temporarily locked. Try again later."
            };
        }

        // Verify password
        var passwordValid =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash);

        if (!passwordValid)
        {
            DateTime? lockoutEnd = null;

            // Lock after 5 failed attempts
            if (user.FailedLoginAttempts >= 4)
            {
                lockoutEnd =
                    DateTime.UtcNow.AddMinutes(15);
            }

            await _authRepository.UpdateLoginFailedAsync(
                user.UserId,
                lockoutEnd);

            return new AuthResponse
            {
                Success = false,
                Message = "Invalid username/email or password."
            };
        }

        // Get role
        var role =
            await _authRepository.GetRoleByIdAsync(
                user.RoleId);

        if (role == null)
        {
            return new AuthResponse
            {
                Success = false,
                Message = "User role not found."
            };
        }

        if (!role.IsActive)
        {
            return new AuthResponse
            {
                Success = false,
                Message = "User role is inactive."
            };
        }

        // Reset failed attempts
        await _authRepository.UpdateLoginSuccessAsync(
            user.UserId);

        // Generate JWT
        var token =
            _jwtTokenService.GenerateToken(
                user,
                role);

        return new AuthResponse
        {
            Success = true,
            Message = "Login Successful",
            Token = token
        };
    }

    public async Task<UserProfileDto?> GetProfileAsync(
        int userId)
    {
        var user =
            await _authRepository.GetUserByIdAsync(userId);

        if (user == null)
        {
            return null;
        }

        var role =
            await _authRepository.GetRoleByIdAsync(
                user.RoleId);

        if (role == null)
        {
            return null;
        }

        return new UserProfileDto
        {
            UserId = user.UserId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            UserName = user.UserName,
            Email = user.Email,
            RoleName = role.RoleName
        };
    }
}