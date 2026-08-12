using CityHomeServicesFix.Shared.DTOs.Admin;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IAdminService
{
    Task<AdminDashboardDto> GetDashboardAsync();
}