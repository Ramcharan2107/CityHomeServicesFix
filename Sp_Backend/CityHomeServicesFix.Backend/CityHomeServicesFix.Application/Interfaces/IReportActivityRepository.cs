using CityHomeServicesFix.Shared.DTOs.ReportActivity;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IReportActivityRepository
{
    Task<int?> CreateAsync(
        CreateReportActivityDto request);

    Task<List<ReportActivityDto>> GetAllAsync();

    Task<ReportActivityDto?> GetByIdAsync(
        int activityId);

    Task<List<ReportActivityDto>> GetByReportIdAsync(
        int reportId);

    Task<bool> UpdateAsync(
        int activityId,
        UpdateReportActivityDto request);

    Task<bool> DeleteAsync(
        int activityId);
}