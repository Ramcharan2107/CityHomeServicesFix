namespace CityHomeServicesFix.Shared.DTOs.Customer;

public class CustomerProfileDto
{
    public int CustomerId { get; set; }

    public int UserId { get; set; }

    public string CustomerCode { get; set; } = string.Empty;

    public string CustomerType { get; set; } = string.Empty;

    public string? CompanyName { get; set; }

    public string? TaxNumber { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string? PreferredLanguage { get; set; }

    public string? Notes { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}