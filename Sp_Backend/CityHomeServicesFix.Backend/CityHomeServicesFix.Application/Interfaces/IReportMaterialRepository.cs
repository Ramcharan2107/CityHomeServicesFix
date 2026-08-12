using CityHomeServicesFix.Shared.DTOs.ReportMaterial;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IReportMaterialRepository
{
    Task<int?> CreateAsync(
        CreateReportMaterialDto request);

    Task<List<ReportMaterialDto>> GetAllAsync();

    Task<ReportMaterialDto?> GetByIdAsync(
        int materialId);

    Task<List<ReportMaterialDto>> GetByReportIdAsync(
        int reportId);

    Task<bool> UpdateAsync(
        int materialId,
        UpdateReportMaterialDto request);

    Task<bool> DeleteAsync(
        int materialId);
}