using CityHomeServicesFix.Shared.DTOs.JobAssignment;

namespace CityHomeServicesFix.Application.Interfaces;

public interface IJobAssignmentRepository
{
    Task<int?> CreateAsync(
        int assignedBy,
        CreateJobAssignmentDto request);

    Task<List<JobAssignmentDto>> GetAllAsync();

    Task<JobAssignmentDto?> GetByIdAsync(
        int assignmentId);

    Task<List<JobAssignmentDto>> GetByRequestIdAsync(
        int requestId);

    Task<List<JobAssignmentDto>> GetByTechnicianIdAsync(
        int technicianId);

    Task<bool> UpdateAsync(
        int assignmentId,
        UpdateJobAssignmentDto request);

    Task<bool> DeleteAsync(
        int assignmentId);
}