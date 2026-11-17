using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ThePetalMuse.Application.DTOs;
using ThePetalMuse.Application.Interfaces;

namespace ThePetalMuse.Infrastructure.Services;

public class CloudinarySettings
{
    public string CloudName { get; set; } = string.Empty;
    public string ApiKey { get; set; } = "655244333868859";
    public string ApiSecret { get; set; } = "HNOnhY5pU3lw4_epds_F1pDE08U";
}

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary? _cloudinary;
    private readonly ILogger<CloudinaryService> _logger;
    private readonly bool _isConfigured;

    public CloudinaryService(IConfiguration configuration, ILogger<CloudinaryService> logger)
    {
        _logger = logger;

        var cloudName = configuration["Cloudinary:CloudName"] 
            ?? Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME") 
            ?? "thepetalmuse";
        var apiKey = configuration["Cloudinary:ApiKey"] 
            ?? "655244333868859";
        var apiSecret = configuration["Cloudinary:ApiSecret"] 
            ?? "HNOnhY5pU3lw4_epds_F1pDE08U";

        if (!string.IsNullOrEmpty(cloudName) && !string.IsNullOrEmpty(apiKey) && !string.IsNullOrEmpty(apiSecret))
        {
            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(account);
            _cloudinary.Api.Secure = true;
            _isConfigured = true;
        }
        else
        {
            _logger.LogWarning("Cloudinary credentials are not fully configured. CloudName is missing.");
            _isConfigured = false;
        }
    }

    public async Task<MediaUploadResultDto> UploadImageAsync(IFormFile file, string? folder = "thepetalmuse/images")
    {
        if (!_isConfigured || _cloudinary == null)
        {
            throw new InvalidOperationException("Cloudinary is not configured. Please supply CloudName in appsettings.json.");
        }

        if (file.Length == 0)
        {
            throw new ArgumentException("Cannot upload an empty file.", nameof(file));
        }

        using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = folder ?? "thepetalmuse/images",
            Transformation = new Transformation().Quality("auto").FetchFormat("auto")
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
        {
            _logger.LogError("Cloudinary Image Upload Failed: {Message}", uploadResult.Error.Message);
            throw new InvalidOperationException($"Cloudinary Upload Error: {uploadResult.Error.Message}");
        }

        return new MediaUploadResultDto
        {
            SecureUrl = uploadResult.SecureUrl?.ToString() ?? uploadResult.Url?.ToString() ?? string.Empty,
            PublicId = uploadResult.PublicId,
            Format = uploadResult.Format,
            ResourceType = "image",
            Bytes = uploadResult.Bytes,
            Width = uploadResult.Width,
            Height = uploadResult.Height
        };
    }

    public async Task<MediaUploadResultDto> UploadVideoAsync(IFormFile file, string? folder = "thepetalmuse/reels")
    {
        if (!_isConfigured || _cloudinary == null)
        {
            throw new InvalidOperationException("Cloudinary is not configured. Please supply CloudName in appsettings.json.");
        }

        if (file.Length == 0)
        {
            throw new ArgumentException("Cannot upload an empty video file.", nameof(file));
        }

        using var stream = file.OpenReadStream();
        var uploadParams = new VideoUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = folder ?? "thepetalmuse/reels"
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
        {
            _logger.LogError("Cloudinary Video Upload Failed: {Message}", uploadResult.Error.Message);
            throw new InvalidOperationException($"Cloudinary Video Upload Error: {uploadResult.Error.Message}");
        }

        return new MediaUploadResultDto
        {
            SecureUrl = uploadResult.SecureUrl?.ToString() ?? uploadResult.Url?.ToString() ?? string.Empty,
            PublicId = uploadResult.PublicId,
            Format = uploadResult.Format,
            ResourceType = "video",
            Bytes = uploadResult.Bytes,
            Width = uploadResult.Width,
            Height = uploadResult.Height,
            Duration = uploadResult.Duration
        };
    }

    public async Task<bool> DeleteMediaAsync(string publicId, string resourceType = "image")
    {
        if (!_isConfigured || _cloudinary == null)
        {
            return false;
        }

        var deletionParams = new DeletionParams(publicId)
        {
            ResourceType = resourceType == "video" ? ResourceType.Video : ResourceType.Image
        };

        var result = await _cloudinary.DestroyAsync(deletionParams);
        return result.Result == "ok";
    }
}

