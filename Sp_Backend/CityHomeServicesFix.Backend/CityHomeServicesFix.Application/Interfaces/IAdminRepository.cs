using CityHomeServicesFix.Shared.DTOs.Admin;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IAdminRepository
{
    Task<AdminDashboardDto> GetDashboardAsync();
}