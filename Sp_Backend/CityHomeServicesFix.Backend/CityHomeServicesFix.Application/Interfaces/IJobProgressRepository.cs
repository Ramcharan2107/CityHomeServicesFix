using CityHomeServicesFix.Shared.DTOs.JobProgress;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IJobProgressRepository
{
    Task<int?> CreateAsync(
        int updatedBy,
        CreateJobProgressDto request);

    Task<List<JobProgressDto>> GetAllAsync();

    Task<JobProgressDto?> GetByIdAsync(
        int progressId);

    Task<List<JobProgressDto>> GetByAssignmentIdAsync(
        int assignmentId);

    Task<bool> UpdateAsync(
        int progressId,
        UpdateJobProgressDto request);

    Task<bool> DeleteAsync(
        int progressId);
}