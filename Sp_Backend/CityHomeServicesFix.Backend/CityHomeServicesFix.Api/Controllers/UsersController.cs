using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IUserService _service;

    public UsersController(
        IUserService service)
    {
        _service = service;
    }


    // =========================================================
    // GET ALL USERS
    // ADMIN ONLY
    // =========================================================

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var users =
            await _service.GetAllAsync();

        return Ok(users);
    }


    // =========================================================
    // GET USER BY ID
    //
    // ADMIN:
    // Can access any user.
    //
    // CUSTOMER:
    // Can access only their own profile.
    // =========================================================

    [HttpGet("{userId:int}")]
    public async Task<IActionResult> GetById(
        int userId)
    {
        var currentUserIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (!int.TryParse(
                currentUserIdClaim,
                out var currentUserId))
        {
            return Unauthorized(new
            {
                Success = false,
                Message = "Invalid authentication token."
            });
        }


        // Admin can view any user.
        if (!User.IsInRole("Admin") &&
            currentUserId != userId)
        {
            return Forbid();
        }


        var user =
            await _service.GetByIdAsync(userId);

        if (user == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "User not found."
            });
        }

        return Ok(user);
    }


    // =========================================================
    // UPDATE USER
    //
    // ADMIN:
    // Can update any user.
    //
    // CUSTOMER:
    // Can update only their own profile.
    // =========================================================

    [HttpPut("{userId:int}")]
    public async Task<IActionResult> Update(
        int userId,
        [FromBody] UpdateUserDto request)
    {
        var currentUserIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (!int.TryParse(
                currentUserIdClaim,
                out var currentUserId))
        {
            return Unauthorized(new
            {
                Success = false,
                Message = "Invalid authentication token."
            });
        }


        // Customer can update only their own profile.
        if (!User.IsInRole("Admin") &&
            currentUserId != userId)
        {
            return Forbid();
        }


        var updated =
            await _service.UpdateAsync(
                userId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "User not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "User updated successfully."
        });
    }


    // =========================================================
    // DELETE USER
    // ADMIN ONLY
    // =========================================================

    [HttpDelete("{userId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(
        int userId)
    {
        var deleted =
            await _service.DeleteAsync(userId);

        if (!deleted)
        {
            return NotFound(new
            {
                Success = false,
                Message = "User not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "User deleted successfully."
        });
    }
}