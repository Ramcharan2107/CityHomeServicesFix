using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Shared.DTOs.JobAssignment;

namespace CityHomeServicesFix.Application.Services;

public class JobAssignmentService : IJobAssignmentService
{
    private readonly IJobAssignmentRepository _repository;

    public JobAssignmentService(
        IJobAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<int?> CreateAsync(
        int assignedBy,
        CreateJobAssignmentDto request)
    {
        return await _repository.CreateAsync(
            assignedBy,
            request);
    }

    public async Task<List<JobAssignmentDto>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<JobAssignmentDto?> GetByIdAsync(
        int assignmentId)
    {
        return await _repository.GetByIdAsync(
            assignmentId);
    }

    public async Task<List<JobAssignmentDto>> GetByRequestIdAsync(
        int requestId)
    {
        return await _repository.GetByRequestIdAsync(
            requestId);
    }

    public async Task<List<JobAssignmentDto>> GetByTechnicianIdAsync(
        int technicianId)
    {
        return await _repository.GetByTechnicianIdAsync(
            technicianId);
    }

    public async Task<bool> UpdateAsync(
        int assignmentId,
        UpdateJobAssignmentDto request)
    {
        return await _repository.UpdateAsync(
            assignmentId,
            request);
    }

    public async Task<bool> DeleteAsync(
        int assignmentId)
    {
        return await _repository.DeleteAsync(
            assignmentId);
    }
}