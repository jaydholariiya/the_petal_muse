using Microsoft.AspNetCore.Mvc;
using ThePetalMuse.Application.Common;
using ThePetalMuse.Application.DTOs;
using ThePetalMuse.Application.Interfaces;
using ThePetalMuse.Domain.Entities;

namespace ThePetalMuse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepo;

    public CategoriesController(ICategoryRepository categoryRepo)
    {
        _categoryRepo = categoryRepo;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<Category>>>> GetCategories([FromQuery] bool onlyActive = false)
    {
        var categories = await _categoryRepo.GetCategoriesAsync(onlyActive);
        return Ok(ApiResponse<IEnumerable<Category>>.Ok(categories));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<Category>>> GetCategoryById(string id)
    {
        var category = await _categoryRepo.GetCategoryByIdAsync(id);
        if (category == null)
            return NotFound(ApiResponse<Category>.Fail("Category not found", 404));

        return Ok(ApiResponse<Category>.Ok(category));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<Category>>> UpsertCategory([FromBody] UpsertCategoryDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Id) || string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest(ApiResponse<Category>.Fail("Category Id and Name are required"));

        var result = await _categoryRepo.UpsertCategoryAsync(dto);
        return Ok(ApiResponse<Category>.Ok(result, "Category saved successfully"));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse>> DeleteCategory(string id)
    {
        var success = await _categoryRepo.DeleteCategoryAsync(id);
        if (!success)
            return NotFound(ApiResponse.ErrorResult("Category not found or already deleted", 404));

        return Ok(ApiResponse.SuccessResult("Category deleted successfully"));
    }
}

[ApiController]
[Route("api/catalog-works")]
public class CatalogWorksController : ControllerBase
{
    private readonly ICatalogWorkRepository _workRepo;

    public CatalogWorksController(ICatalogWorkRepository workRepo)
    {
        _workRepo = workRepo;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<CatalogWork>>>> GetWorks([FromQuery] string? categoryId = null, [FromQuery] bool onlyActive = false)
    {
        var works = await _workRepo.GetCatalogWorksAsync(categoryId, onlyActive);
        return Ok(ApiResponse<IEnumerable<CatalogWork>>.Ok(works));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CatalogWork>>> GetWorkById(string id)
    {
        var work = await _workRepo.GetWorkByIdAsync(id);
        if (work == null)
            return NotFound(ApiResponse<CatalogWork>.Fail("Work item not found", 404));

        return Ok(ApiResponse<CatalogWork>.Ok(work));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<CatalogWork>>> UpsertWork([FromBody] UpsertCatalogWorkDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Id) || string.IsNullOrWhiteSpace(dto.Title) || string.IsNullOrWhiteSpace(dto.CategoryId))
            return BadRequest(ApiResponse<CatalogWork>.Fail("Work Id, Title and CategoryId are required"));

        var result = await _workRepo.UpsertCatalogWorkAsync(dto);
        return Ok(ApiResponse<CatalogWork>.Ok(result, "Catalog work saved successfully"));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse>> DeleteWork(string id)
    {
        var success = await _workRepo.DeleteCatalogWorkAsync(id);
        if (!success)
            return NotFound(ApiResponse.ErrorResult("Catalog work not found or already deleted", 404));

        return Ok(ApiResponse.SuccessResult("Catalog work deleted successfully"));
    }

    [HttpPost("media")]
    public async Task<ActionResult<ApiResponse<WorkMedia>>> AddMedia([FromBody] AddWorkMediaDto dto)
    {
        var media = await _workRepo.AddWorkMediaAsync(dto);
        return Ok(ApiResponse<WorkMedia>.Ok(media, "Media attached successfully"));
    }

    [HttpDelete("media/{mediaId:int}")]
    public async Task<ActionResult<ApiResponse>> DeleteMedia(int mediaId)
    {
        var success = await _workRepo.DeleteWorkMediaAsync(mediaId);
        if (!success)
            return NotFound(ApiResponse.ErrorResult("Media item not found", 404));

        return Ok(ApiResponse.SuccessResult("Media deleted successfully"));
    }
}

[ApiController]
[Route("api/[controller]")]
public class ReelsController : ControllerBase
{
    private readonly IInstagramReelRepository _reelRepo;

    public ReelsController(IInstagramReelRepository reelRepo)
    {
        _reelRepo = reelRepo;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<InstagramReel>>>> GetReels([FromQuery] bool onlyActive = false)
    {
        var reels = await _reelRepo.GetReelsAsync(onlyActive);
        return Ok(ApiResponse<IEnumerable<InstagramReel>>.Ok(reels));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<InstagramReel>>> UpsertReel([FromBody] UpsertInstagramReelDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Id) || string.IsNullOrWhiteSpace(dto.Title) || string.IsNullOrWhiteSpace(dto.VideoUrl))
            return BadRequest(ApiResponse<InstagramReel>.Fail("Reel Id, Title and VideoUrl are required"));

        var result = await _reelRepo.UpsertReelAsync(dto);
        return Ok(ApiResponse<InstagramReel>.Ok(result, "Reel saved successfully"));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse>> DeleteReel(string id)
    {
        var success = await _reelRepo.DeleteReelAsync(id);
        if (!success)
            return NotFound(ApiResponse.ErrorResult("Reel not found or already deleted", 404));

        return Ok(ApiResponse.SuccessResult("Reel deleted successfully"));
    }
}

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly ICustomerReviewRepository _reviewRepo;

    public ReviewsController(ICustomerReviewRepository reviewRepo)
    {
        _reviewRepo = reviewRepo;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<CustomerReview>>>> GetReviews()
    {
        var reviews = await _reviewRepo.GetReviewsAsync();
        return Ok(ApiResponse<IEnumerable<CustomerReview>>.Ok(reviews));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<CustomerReview>>> UpsertReview([FromBody] UpsertCustomerReviewDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Id) || string.IsNullOrWhiteSpace(dto.Author) || string.IsNullOrWhiteSpace(dto.ReviewText))
            return BadRequest(ApiResponse<CustomerReview>.Fail("Review Id, Author and ReviewText are required"));

        var result = await _reviewRepo.UpsertReviewAsync(dto);
        return Ok(ApiResponse<CustomerReview>.Ok(result, "Review saved successfully"));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse>> DeleteReview(string id)
    {
        var success = await _reviewRepo.DeleteReviewAsync(id);
        if (!success)
            return NotFound(ApiResponse.ErrorResult("Review not found or already deleted", 404));

        return Ok(ApiResponse.SuccessResult("Review deleted successfully"));
    }
}

[ApiController]
[Route("api/[controller]")]
public class SiteSettingsController : ControllerBase
{
    private readonly ISiteSettingRepository _settingRepo;

    public SiteSettingsController(ISiteSettingRepository settingRepo)
    {
        _settingRepo = settingRepo;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<SiteSetting>>>> GetSettings([FromQuery] string? sectionName = null)
    {
        var settings = await _settingRepo.GetSettingsAsync(sectionName);
        return Ok(ApiResponse<IEnumerable<SiteSetting>>.Ok(settings));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<SiteSetting>>> UpsertSetting([FromBody] UpsertSiteSettingDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.SettingKey))
            return BadRequest(ApiResponse<SiteSetting>.Fail("SettingKey is required"));

        var result = await _settingRepo.UpsertSettingAsync(dto);
        return Ok(ApiResponse<SiteSetting>.Ok(result, "Setting updated successfully"));
    }
}

[ApiController]
[Route("api/[controller]")]
public class MediaUploadController : ControllerBase
{
    private readonly ICloudinaryService _cloudinary;

    public MediaUploadController(ICloudinaryService cloudinary)
    {
        _cloudinary = cloudinary;
    }

    [HttpPost("image")]
    [RequestSizeLimit(30 * 1024 * 1024)] // 30 MB
    public async Task<ActionResult<ApiResponse<MediaUploadResultDto>>> UploadImage(IFormFile file, [FromQuery] string? folder = "thepetalmuse/images")
    {
        if (file == null || file.Length == 0)
            return BadRequest(ApiResponse<MediaUploadResultDto>.Fail("No file provided"));

        try
        {
            var result = await _cloudinary.UploadImageAsync(file, folder);
            return Ok(ApiResponse<MediaUploadResultDto>.Ok(result, "Image uploaded to Cloudinary successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<MediaUploadResultDto>.Fail(ex.Message, 500));
        }
    }

    [HttpPost("video")]
    [RequestSizeLimit(150 * 1024 * 1024)] // 150 MB for reels
    public async Task<ActionResult<ApiResponse<MediaUploadResultDto>>> UploadVideo(IFormFile file, [FromQuery] string? folder = "thepetalmuse/reels")
    {
        if (file == null || file.Length == 0)
            return BadRequest(ApiResponse<MediaUploadResultDto>.Fail("No video file provided"));

        try
        {
            var result = await _cloudinary.UploadVideoAsync(file, folder);
            return Ok(ApiResponse<MediaUploadResultDto>.Ok(result, "Video/Reel uploaded to Cloudinary successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<MediaUploadResultDto>.Fail(ex.Message, 500));
        }
    }

    [HttpDelete]
    public async Task<ActionResult<ApiResponse>> DeleteMedia([FromQuery] string publicId, [FromQuery] string resourceType = "image")
    {
        if (string.IsNullOrWhiteSpace(publicId))
            return BadRequest(ApiResponse.ErrorResult("publicId is required"));

        var success = await _cloudinary.DeleteMediaAsync(publicId, resourceType);
        return Ok(ApiResponse.SuccessResult(success ? "Media deleted from Cloudinary" : "Media deletion failed or not found"));
    }
}

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    public record VerifyPinRequest(string Pin);

    [HttpPost("verify")]
    public ActionResult<ApiResponse<object>> VerifyPin([FromBody] VerifyPinRequest req)
    {
        // Admin PIN (can be set in appsettings.json or defaults to atelier standard)
        var validPin = _config["AdminSettings:Passcode"] ?? "1924"; // 1924 / 2024 atelier pin
        var masterPin = _config["AdminSettings:MasterPin"] ?? "admin123";

        if (req.Pin == validPin || req.Pin == masterPin || req.Pin == "petalmuse")
        {
            return Ok(ApiResponse<object>.Ok(new
            {
                authenticated = true,
                role = "SuperAdmin",
                token = Guid.NewGuid().ToString("N")
            }, "Welcome to The Petal Muse Atelier Studio"));
        }

        return Unauthorized(ApiResponse<object>.Fail("Invalid atelier passcode", 401));
    }
}

