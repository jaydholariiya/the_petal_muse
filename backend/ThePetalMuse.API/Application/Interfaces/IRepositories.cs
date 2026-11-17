using ThePetalMuse.Application.DTOs;
using ThePetalMuse.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace ThePetalMuse.Application.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetCategoriesAsync(bool onlyActive = true);
    Task<Category?> GetCategoryByIdAsync(string id);
    Task<Category> UpsertCategoryAsync(UpsertCategoryDto dto);
    Task<bool> DeleteCategoryAsync(string id);
}

public interface ICatalogWorkRepository
{
    Task<IEnumerable<CatalogWork>> GetCatalogWorksAsync(string? categoryId = null, bool onlyActive = true);
    Task<CatalogWork?> GetWorkByIdAsync(string id);
    Task<CatalogWork> UpsertCatalogWorkAsync(UpsertCatalogWorkDto dto);
    Task<bool> DeleteCatalogWorkAsync(string id);
    Task<WorkMedia> AddWorkMediaAsync(AddWorkMediaDto dto);
    Task<bool> DeleteWorkMediaAsync(int mediaId);
}

public interface IInstagramReelRepository
{
    Task<IEnumerable<InstagramReel>> GetReelsAsync(bool onlyActive = true);
    Task<InstagramReel> UpsertReelAsync(UpsertInstagramReelDto dto);
    Task<bool> DeleteReelAsync(string id);
}

public interface ICustomerReviewRepository
{
    Task<IEnumerable<CustomerReview>> GetReviewsAsync();
    Task<CustomerReview> UpsertReviewAsync(UpsertCustomerReviewDto dto);
    Task<bool> DeleteReviewAsync(string id);
}

public interface ISiteSettingRepository
{
    Task<IEnumerable<SiteSetting>> GetSettingsAsync(string? sectionName = null);
    Task<SiteSetting> UpsertSettingAsync(UpsertSiteSettingDto dto);
}

public interface ICloudinaryService
{
    Task<MediaUploadResultDto> UploadImageAsync(IFormFile file, string? folder = "thepetalmuse/images");
    Task<MediaUploadResultDto> UploadVideoAsync(IFormFile file, string? folder = "thepetalmuse/reels");
    Task<bool> DeleteMediaAsync(string publicId, string resourceType = "image");
}

