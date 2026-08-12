namespace CityHomeServicesFix.Shared.DTOs.Admin;

public class AdminDashboardDto
{
    public int TotalUsers { get; set; }

    public int TotalCustomers { get; set; }

    public int TotalTechnicians { get; set; }

    public int TotalServices { get; set; }

    public int TotalBookings { get; set; }

    public int PendingRequests { get; set; }

    public int AssignedRequests { get; set; }

    public int InProgressRequests { get; set; }

    public int CompletedRequests { get; set; }
}