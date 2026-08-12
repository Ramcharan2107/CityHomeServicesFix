namespace CityHomeServicesFix.Shared.DTOs.ReportMaterial;

public class UpdateReportMaterialDto
{
    public string MaterialName { get; set; } = string.Empty;

    public decimal Quantity { get; set; }

    public string? Unit { get; set; }

    public decimal? UnitPrice { get; set; }
}