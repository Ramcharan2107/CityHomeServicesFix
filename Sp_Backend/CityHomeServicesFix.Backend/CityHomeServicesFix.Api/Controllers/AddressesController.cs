using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Customer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CityHomeServicesFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AddressesController : ControllerBase
{
    private readonly ICustomerAddressService _addressService;

    public AddressesController(
        ICustomerAddressService addressService)
    {
        _addressService = addressService;
    }

    private bool TryGetUserId(out int userId)
    {
        return int.TryParse(
            User.FindFirstValue(ClaimTypes.NameIdentifier),
            out userId);
    }

    [HttpGet]
    public async Task<IActionResult> GetAddresses()
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var addresses =
            await _addressService.GetMyAddressesAsync(userId);

        return Ok(addresses);
    }

    [HttpGet("{addressId:int}")]
    public async Task<IActionResult> GetAddress(int addressId)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var address =
            await _addressService.GetAddressByIdAsync(
                addressId,
                userId);

        if (address == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Address not found."
            });
        }

        return Ok(address);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAddress(
        [FromBody] CustomerAddressRequestDto request)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var addressId =
            await _addressService.CreateAddressAsync(
                userId,
                request);

        if (addressId == null)
        {
            return BadRequest(new
            {
                Success = false,
                Message = "Customer profile not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Address created successfully.",
            AddressId = addressId
        });
    }

    [HttpPut("{addressId:int}")]
    public async Task<IActionResult> UpdateAddress(
        int addressId,
        [FromBody] CustomerAddressRequestDto request)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var updated =
            await _addressService.UpdateAddressAsync(
                addressId,
                userId,
                request);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Address not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Address updated successfully."
        });
    }

    [HttpDelete("{addressId:int}")]
    public async Task<IActionResult> DeleteAddress(int addressId)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var deleted =
            await _addressService.DeleteAddressAsync(
                addressId,
                userId);

        if (!deleted)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Address not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = "Address deleted successfully."
        });
    }

    [HttpPut("{addressId:int}/default")]
    public async Task<IActionResult> SetDefaultAddress(
        int addressId,
        [FromQuery] bool isDefault = true)
    {
        if (!TryGetUserId(out var userId))
            return Unauthorized();

        var updated =
            await _addressService.SetDefaultAddressAsync(
                addressId,
                userId,
                isDefault);

        if (!updated)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Address not found."
            });
        }

        return Ok(new
        {
            Success = true,
            Message = isDefault
                ? "Address set as default."
                : "Address removed from default."
        });
    }
}