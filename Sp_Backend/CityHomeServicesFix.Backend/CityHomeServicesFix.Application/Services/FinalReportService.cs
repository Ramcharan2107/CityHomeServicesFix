using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.FinalReport;

namespace CityHomeServicesFix.Application.Services;

public class FinalReportService : IFinalReportService
{
    private readonly IFinalReportRepository _repository;

    public FinalReportService(
        IFinalReportRepository repository)
    {
        _repository = repository;
    }

    public async Task<int?> CreateAsync(
        int createdBy,
        CreateFinalReportDto request)
    {
        return await _repository.CreateAsync(
            createdBy,
            request);
    }

    public async Task<List<FinalReportDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<FinalReportDto?> GetByIdAsync(
        int reportId)
    {
        return await _repository.GetByIdAsync(
            reportId);
    }

    public async Task<bool> UpdateAsync(
        int reportId,
        UpdateFinalReportDto request)
    {
        return await _repository.UpdateAsync(
            reportId,
            request);
    }

    public async Task<bool> DeleteAsync(
        int reportId)
    {
        return await _repository.DeleteAsync(
            reportId);
    }
}