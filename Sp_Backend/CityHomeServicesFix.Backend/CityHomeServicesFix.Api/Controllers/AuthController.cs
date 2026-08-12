using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] RegisterRequest request)
    {
        var result =
            await _authService.RegisterAsync(request);

        if (!result.Success)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
    [FromBody] LoginRequest request)
    {
        try
        {
            var result = await _authService.LoginAsync(request);

            if (!result.Success)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            // TEMPORARY DEBUG CODE
            return Ok(new
            {
                Debug = true,
                ExceptionType = ex.GetType().FullName,
                Message = ex.Message,
                InnerException = ex.InnerException?.Message,
                Details = ex.ToString()
            });
        }
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized(new
            {
                Success = false,
                Message = "Invalid authentication token."
            });
        }

        var profile =
            await _authService.GetProfileAsync(userId);

        if (profile == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "User profile not found."
            });
        }

        return Ok(profile);
    }
}