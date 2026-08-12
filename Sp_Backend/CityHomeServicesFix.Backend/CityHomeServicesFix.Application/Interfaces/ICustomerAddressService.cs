using CityHomeServicesFix.Shared.DTOs.Customer;

namespace CityHomeServicesFix.Application.Interfaces;

public interface ICustomerAddressService
{
    Task<List<CustomerAddressDto>> GetMyAddressesAsync(int userId);

    Task<CustomerAddressDto?> GetAddressByIdAsync(
        int addressId,
        int userId);

    Task<int?> CreateAddressAsync(
        int userId,
        CustomerAddressRequestDto request);

    Task<bool> UpdateAddressAsync(
        int addressId,
        int userId,
        CustomerAddressRequestDto request);

    Task<bool> DeleteAddressAsync(
        int addressId,
        int userId);

    Task<bool> SetDefaultAddressAsync(
        int addressId,
        int userId,
        bool isDefault);
}