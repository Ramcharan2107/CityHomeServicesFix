namespace CityHomeServicesFix.Shared.DTOs.FinalReport;

public class FinalReportDto
{
    public int ReportId { get; set; }

    public int AssignmentId { get; set; }

    public string WorkSummary { get; set; } = string.Empty;

    public decimal? HoursWorked { get; set; }

    public decimal? TotalCost { get; set; }

    public string? TechnicianRemarks { get; set; }

    public string? CustomerRemarks { get; set; }

    public string? CustomerSignature { get; set; }

    public DateTime CompletionDate { get; set; }

    public int CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}