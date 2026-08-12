namespace CityHomeServicesFix.Shared.DTOs.FinalReport;

public class CreateFinalReportDto
{
    public int AssignmentId { get; set; }

    public string WorkSummary { get; set; } = string.Empty;

    public decimal? HoursWorked { get; set; }

    public decimal? TotalCost { get; set; }

    public string? TechnicianRemarks { get; set; }

    public string? CustomerRemarks { get; set; }

    public string? CustomerSignature { get; set; }
}