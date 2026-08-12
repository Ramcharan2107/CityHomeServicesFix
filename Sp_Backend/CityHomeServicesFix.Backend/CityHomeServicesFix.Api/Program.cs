using System.Text;
using CityHomeServicesFix.Application.Interfaces;
using CityHomeServicesFix.Application.Services;
using CityHomeServicesFix.Infrastructure.Authentication;
using CityHomeServicesFix.Infrastructure.Database;
using CityHomeServicesFix.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ============================================================
// LOGGING
// ============================================================

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// ============================================================
// CONTROLLERS
// ============================================================

builder.Services.AddControllers();

// ============================================================
// JWT SETTINGS
// ============================================================

var jwtSettings = builder.Configuration
    .GetSection("Jwt")
    .Get<JwtSettings>();

if (jwtSettings == null ||
    string.IsNullOrWhiteSpace(jwtSettings.Key))
{
    throw new InvalidOperationException(
        "JWT configuration is missing.");
}

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt"));

// ============================================================
// DEPENDENCY INJECTION
// ============================================================

// Database
builder.Services.AddScoped<IDbConnectionFactory, SqlConnectionFactory>();

// Authentication
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

// Customer
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<ICustomerService, CustomerService>();

// Booking
builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<IBookingService, BookingService>();

// Customer Address
builder.Services.AddScoped<
    ICustomerAddressRepository,
    CustomerAddressRepository>();

builder.Services.AddScoped<
    ICustomerAddressService,
    CustomerAddressService>();

// Service Request
builder.Services.AddScoped<
    IServiceRequestRepository,
    ServiceRequestRepository>();

builder.Services.AddScoped<
    IServiceRequestService,
    ServiceRequestService>();

// Service Catalog
builder.Services.AddScoped<
    IServiceRepository,
    ServiceRepository>();

builder.Services.AddScoped<
    IServiceCatalogService,
    ServiceCatalogService>();

// Notification
builder.Services.AddScoped<
    INotificationRepository,
    NotificationRepository>();

builder.Services.AddScoped<
    INotificationService,
    NotificationService>();

// Technician
builder.Services.AddScoped<
    ITechnicianRepository,
    TechnicianRepository>();

builder.Services.AddScoped<
    ITechnicianService,
    TechnicianService>();

// Job Assignment
builder.Services.AddScoped<
    IJobAssignmentRepository,
    JobAssignmentRepository>();

builder.Services.AddScoped<
    IJobAssignmentService,
    JobAssignmentService>();

// Job Progress
builder.Services.AddScoped<
    IJobProgressRepository,
    JobProgressRepository>();

builder.Services.AddScoped<
    IJobProgressService,
    JobProgressService>();

// Final Report
builder.Services.AddScoped<
    IFinalReportRepository,
    FinalReportRepository>();

builder.Services.AddScoped<
    IFinalReportService,
    FinalReportService>();

// Report Activity
builder.Services.AddScoped<
    IReportActivityRepository,
    ReportActivityRepository>();

builder.Services.AddScoped<
    IReportActivityService,
    ReportActivityService>();

// Report Material
builder.Services.AddScoped<
    IReportMaterialRepository,
    ReportMaterialRepository>();

builder.Services.AddScoped<
    IReportMaterialService,
    ReportMaterialService>();

// Service Category
builder.Services.AddScoped<
    IServiceCategoryRepository,
    ServiceCategoryRepository>();

builder.Services.AddScoped<
    IServiceCategoryService,
    ServiceCategoryService>();

// User
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

// Admin
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IAdminService, AdminService>();

// ============================================================
// JWT AUTHENTICATION
// ============================================================

var key = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(jwtSettings.Key));

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;

        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,

                IssuerSigningKey = key,

                ClockSkew = TimeSpan.Zero
            };
    });

// ============================================================
// AUTHORIZATION
// ============================================================

builder.Services.AddAuthorization();

// ============================================================
// CORS
// ============================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ============================================================
// SWAGGER
// ============================================================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "City Home Services API",
            Version = "v1",
            Description =
                "City Home Services Backend API"
        });

    options.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,

            Description =
                "Enter JWT token as: Bearer {token}"
        });

    options.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference =
                        new OpenApiReference
                        {
                            Type =
                                ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                },
                Array.Empty<string>()
            }
        });
});

// ============================================================
// BUILD APPLICATION
// ============================================================

var app = builder.Build();

// ============================================================
// HTTP PIPELINE
// ============================================================

// Swagger
app.UseSwagger();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint(
        "/swagger/v1/swagger.json",
        "City Home Services API v1");

    options.RoutePrefix = "swagger";
});

// IMPORTANT:
// Removed app.UseHttpsRedirection()
// because your Somee hosting logs showed:
// "Failed to determine the https port for redirect."

// CORS
app.UseCors("Frontend");

// Authentication
app.UseAuthentication();

// Authorization
app.UseAuthorization();

// Controllers
app.MapControllers();

// ============================================================
// DEFAULT ROOT RESPONSE
// ============================================================

app.MapGet("/", () => Results.Ok(new
{
    message = "City Home Services API is running successfully",
    swagger = "/swagger"
}));

// ============================================================
// RUN APPLICATION
// ============================================================

app.Run();