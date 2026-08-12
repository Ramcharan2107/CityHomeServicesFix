using CityHomeServicesFix.Shared.DTOs.FinalReport;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IFinalReportRepository
{
    Task<int?> CreateAsync(
        int createdBy,
        CreateFinalReportDto request);

    Task<List<FinalReportDto>> GetAllAsync();

    Task<FinalReportDto?> GetByIdAsync(
        int reportId);

    Task<bool> UpdateAsync(
        int reportId,
        UpdateFinalReportDto request);

    Task<bool> DeleteAsync(
        int reportId);
}