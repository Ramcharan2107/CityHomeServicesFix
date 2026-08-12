using System.Data;

namespace CityHomeServicesFix.Infrastructure.Database;

public interface IDbConnectionFactory
{
    IDbConnection CreateConnection();
}