using ThePetalMuse.Application.Interfaces;
using ThePetalMuse.Infrastructure.Data;
using ThePetalMuse.Infrastructure.Repositories;
using ThePetalMuse.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "THE PETAL MUSE Atelier API",
        Version = "v1",
        Description = "Couture Floral & Gifting Atelier API (SQL Server SSMS + Dapper Stored Procedures + Cloudinary)"
    });
});

// 2. Register Clean Architecture Dependencies
builder.Services.AddSingleton<IDbConnectionFactory, SqlConnectionFactory>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICatalogWorkRepository, CatalogWorkRepository>();
builder.Services.AddScoped<IInstagramReelRepository, InstagramReelRepository>();
builder.Services.AddScoped<ICustomerReviewRepository, CustomerReviewRepository>();
builder.Services.AddScoped<ISiteSettingRepository, SiteSettingRepository>();
builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();

// 3. CORS Policy for Next.js Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000", "http://127.0.0.1:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// 4. Configure HTTP Request Pipeline
app.UseCors("AllowNextApp");

// Always enable Swagger for testing & development
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "THE PETAL MUSE API v1");
    c.RoutePrefix = string.Empty; // Swagger at root http://localhost:5000/
});

app.UseRouting();
app.MapControllers();

app.Run();
