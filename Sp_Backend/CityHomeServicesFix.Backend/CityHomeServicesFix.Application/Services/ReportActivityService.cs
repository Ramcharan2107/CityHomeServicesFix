using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.ReportActivity;

namespace CityHomeServicesFix.Application.Services;

public class ReportActivityService : IReportActivityService
{
    private readonly IReportActivityRepository _repository;

    public ReportActivityService(
        IReportActivityRepository repository)
    {
        _repository = repository;
    }

    public async Task<int?> CreateAsync(
        CreateReportActivityDto request)
    {
        return await _repository.CreateAsync(request);
    }

    public async Task<List<ReportActivityDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<ReportActivityDto?> GetByIdAsync(
        int activityId)
    {
        return await _repository.GetByIdAsync(activityId);
    }

    public async Task<List<ReportActivityDto>> GetByReportIdAsync(
        int reportId)
    {
        return await _repository.GetByReportIdAsync(reportId);
    }

    public async Task<bool> UpdateAsync(
        int activityId,
        UpdateReportActivityDto request)
    {
        return await _repository.UpdateAsync(
            activityId,
            request);
    }

    public async Task<bool> DeleteAsync(
        int activityId)
    {
        return await _repository.DeleteAsync(activityId);
    }
}