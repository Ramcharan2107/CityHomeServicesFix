using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.ReportMaterial;

namespace CityHomeServicesFix.Application.Services;

public class ReportMaterialService : IReportMaterialService
{
    private readonly IReportMaterialRepository _repository;

    public ReportMaterialService(
        IReportMaterialRepository repository)
    {
        _repository = repository;
    }

    public async Task<int?> CreateAsync(
        CreateReportMaterialDto request)
    {
        return await _repository.CreateAsync(request);
    }

    public async Task<List<ReportMaterialDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<ReportMaterialDto?> GetByIdAsync(
        int materialId)
    {
        return await _repository.GetByIdAsync(materialId);
    }

    public async Task<List<ReportMaterialDto>> GetByReportIdAsync(
        int reportId)
    {
        return await _repository.GetByReportIdAsync(reportId);
    }

    public async Task<bool> UpdateAsync(
        int materialId,
        UpdateReportMaterialDto request)
    {
        return await _repository.UpdateAsync(
            materialId,
            request);
    }

    public async Task<bool> DeleteAsync(
        int materialId)
    {
        return await _repository.DeleteAsync(materialId);
    }
}