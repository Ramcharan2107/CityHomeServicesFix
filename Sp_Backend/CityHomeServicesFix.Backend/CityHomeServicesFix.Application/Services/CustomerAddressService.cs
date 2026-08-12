using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.Customer;

namespace CityHomeServicesFix.Application.Services;

public class CustomerAddressService : ICustomerAddressService
{
    private readonly ICustomerAddressRepository _repository;

    public CustomerAddressService(
        ICustomerAddressRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<CustomerAddressDto>> GetMyAddressesAsync(
        int userId)
    {
        return await _repository.GetMyAddressesAsync(userId);
    }

    public async Task<CustomerAddressDto?> GetAddressByIdAsync(
        int addressId,
        int userId)
    {
        return await _repository.GetAddressByIdAsync(
            addressId,
            userId);
    }

    public async Task<int?> CreateAddressAsync(
        int userId,
        CustomerAddressRequestDto request)
    {
        return await _repository.CreateAddressAsync(
            userId,
            request);
    }

    public async Task<bool> UpdateAddressAsync(
        int addressId,
        int userId,
        CustomerAddressRequestDto request)
    {
        return await _repository.UpdateAddressAsync(
            addressId,
            userId,
            request);
    }

    public async Task<bool> DeleteAddressAsync(
        int addressId,
        int userId)
    {
        return await _repository.DeleteAddressAsync(
            addressId,
            userId);
    }

    public async Task<bool> SetDefaultAddressAsync(
        int addressId,
        int userId,
        bool isDefault)
    {
        return await _repository.SetDefaultAddressAsync(
            addressId,
            userId,
            isDefault);
    }
}