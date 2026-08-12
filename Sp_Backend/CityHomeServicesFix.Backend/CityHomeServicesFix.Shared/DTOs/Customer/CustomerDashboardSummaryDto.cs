namespace CityHomeServicesFix.Shared.DTOs.Customer;

public class CustomerDashboardSummaryDto
{
    public string CustomerName { get; set; } = string.Empty;

    public int TotalBookings { get; set; }

    public int PendingBookings { get; set; }

    public int CompletedBookings { get; set; }

    public int TotalAddresses { get; set; }
}