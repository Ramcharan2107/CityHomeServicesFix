using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.JobProgress;

namespace CityHomeServicesFix.Application.Services;

public class JobProgressService : IJobProgressService
{
    private readonly IJobProgressRepository _repository;

    public JobProgressService(
        IJobProgressRepository repository)
    {
        _repository = repository;
    }

    public async Task<int?> CreateAsync(
        int updatedBy,
        CreateJobProgressDto request)
    {
        return await _repository.CreateAsync(
            updatedBy,
            request);
    }

    public async Task<List<JobProgressDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<JobProgressDto?> GetByIdAsync(
        int progressId)
    {
        return await _repository.GetByIdAsync(
            progressId);
    }

    public async Task<List<JobProgressDto>> GetByAssignmentIdAsync(
        int assignmentId)
    {
        return await _repository.GetByAssignmentIdAsync(
            assignmentId);
    }

    public async Task<bool> UpdateAsync(
        int progressId,
        UpdateJobProgressDto request)
    {
        return await _repository.UpdateAsync(
            progressId,
            request);
    }

    public async Task<bool> DeleteAsync(
        int progressId)
    {
        return await _repository.DeleteAsync(
            progressId);
    }
}