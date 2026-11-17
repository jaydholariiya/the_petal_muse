using System.Data;
using Dapper;
using ThePetalMuse.Application.DTOs;
using ThePetalMuse.Application.Interfaces;
using ThePetalMuse.Domain.Entities;
using ThePetalMuse.Infrastructure.Data;

namespace ThePetalMuse.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CategoryRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<Category>> GetCategoriesAsync(bool onlyActive = true)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryAsync<Category>(
            "sp_GetCategories",
            new { OnlyActive = onlyActive },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<Category?> GetCategoryByIdAsync(string id)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<Category>(
            "sp_GetCategoryById",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<Category> UpsertCategoryAsync(UpsertCategoryDto dto)
    {
        using var conn = _connectionFactory.CreateConnection();
        var result = await conn.QuerySingleAsync<Category>(
            "sp_UpsertCategory",
            new
            {
                dto.Id,
                dto.Slug,
                dto.Name,
                dto.ShortTitle,
                dto.Subtitle,
                dto.Description,
                dto.ImageUrl,
                dto.Badge,
                dto.DisplayOrder,
                dto.IsActive
            },
            commandType: CommandType.StoredProcedure
        );
        return result;
    }

    public async Task<bool> DeleteCategoryAsync(string id)
    {
        using var conn = _connectionFactory.CreateConnection();
        var affected = await conn.ExecuteScalarAsync<int>(
            "sp_DeleteCategory",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );
        return affected > 0;
    }
}

public class CatalogWorkRepository : ICatalogWorkRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CatalogWorkRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<CatalogWork>> GetCatalogWorksAsync(string? categoryId = null, bool onlyActive = true)
    {
        using var conn = _connectionFactory.CreateConnection();
        var works = (await conn.QueryAsync<CatalogWork>(
            "sp_GetCatalogWorks",
            new { CategoryId = categoryId, OnlyActive = onlyActive },
            commandType: CommandType.StoredProcedure
        )).ToList();

        // Also fetch media for these works in batch or on demand
        if (works.Count > 0)
        {
            var workIds = works.Select(w => w.Id).ToList();
            var media = (await conn.QueryAsync<WorkMedia>(
                "SELECT * FROM WorkMedia WHERE WorkId IN @WorkIds ORDER BY DisplayOrder ASC",
                new { WorkIds = workIds }
            )).ToList();

            foreach (var work in works)
            {
                work.Media = media.Where(m => m.WorkId == work.Id).ToList();
            }
        }

        return works;
    }

    public async Task<CatalogWork?> GetWorkByIdAsync(string id)
    {
        using var conn = _connectionFactory.CreateConnection();
        using var multi = await conn.QueryMultipleAsync(
            "sp_GetWorkById",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );

        var work = await multi.ReadFirstOrDefaultAsync<CatalogWork>();
        if (work != null)
        {
            var media = (await multi.ReadAsync<WorkMedia>()).ToList();
            work.Media = media;
        }

        return work;
    }

    public async Task<CatalogWork> UpsertCatalogWorkAsync(UpsertCatalogWorkDto dto)
    {
        using var conn = _connectionFactory.CreateConnection();
        var work = await conn.QuerySingleAsync<CatalogWork>(
            "sp_UpsertCatalogWork",
            new
            {
                dto.Id,
                dto.CategoryId,
                dto.Title,
                dto.Slug,
                dto.Price,
                dto.PriceNumber,
                dto.Description,
                dto.Badge,
                dto.CoverImage,
                dto.WorkOrder,
                dto.Tags,
                dto.IsSignature,
                dto.IsActive
            },
            commandType: CommandType.StoredProcedure
        );

        // Attach additional images if provided
        if (dto.AdditionalImages != null && dto.AdditionalImages.Count > 0)
        {
            // Clear existing and re-insert or append
            for (int i = 0; i < dto.AdditionalImages.Count; i++)
            {
                await conn.ExecuteAsync(
                    "sp_AddWorkMedia",
                    new
                    {
                        WorkId = dto.Id,
                        MediaType = "image",
                        MediaUrl = dto.AdditionalImages[i],
                        PublicId = (string?)null,
                        ThumbnailUrl = (string?)null,
                        Caption = (string?)null,
                        DisplayOrder = i + 1
                    },
                    commandType: CommandType.StoredProcedure
                );
            }
        }

        if (!string.IsNullOrEmpty(dto.VideoUrl))
        {
            await conn.ExecuteAsync(
                "sp_AddWorkMedia",
                new
                {
                    WorkId = dto.Id,
                    MediaType = "video",
                    MediaUrl = dto.VideoUrl,
                    PublicId = (string?)null,
                    ThumbnailUrl = (string?)null,
                    Caption = (string?)null,
                    DisplayOrder = 99
                },
                commandType: CommandType.StoredProcedure
            );
        }

        return work;
    }

    public async Task<bool> DeleteCatalogWorkAsync(string id)
    {
        using var conn = _connectionFactory.CreateConnection();
        var affected = await conn.ExecuteScalarAsync<int>(
            "sp_DeleteCatalogWork",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );
        return affected > 0;
    }

    public async Task<WorkMedia> AddWorkMediaAsync(AddWorkMediaDto dto)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QuerySingleAsync<WorkMedia>(
            "sp_AddWorkMedia",
            new
            {
                dto.WorkId,
                dto.MediaType,
                dto.MediaUrl,
                dto.PublicId,
                dto.ThumbnailUrl,
                dto.Caption,
                dto.DisplayOrder
            },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<bool> DeleteWorkMediaAsync(int mediaId)
    {
        using var conn = _connectionFactory.CreateConnection();
        var affected = await conn.ExecuteScalarAsync<int>(
            "sp_DeleteWorkMedia",
            new { Id = mediaId },
            commandType: CommandType.StoredProcedure
        );
        return affected > 0;
    }
}

public class InstagramReelRepository : IInstagramReelRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public InstagramReelRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<InstagramReel>> GetReelsAsync(bool onlyActive = true)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryAsync<InstagramReel>(
            "sp_GetInstagramReels",
            new { OnlyActive = onlyActive },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<InstagramReel> UpsertReelAsync(UpsertInstagramReelDto dto)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QuerySingleAsync<InstagramReel>(
            "sp_UpsertInstagramReel",
            new
            {
                dto.Id,
                dto.Title,
                dto.Caption,
                dto.VideoUrl,
                dto.CoverImageUrl,
                dto.PublicId,
                dto.ViewsDisplay,
                dto.LikesDisplay,
                dto.DisplayOrder,
                dto.IsActive
            },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<bool> DeleteReelAsync(string id)
    {
        using var conn = _connectionFactory.CreateConnection();
        var affected = await conn.ExecuteScalarAsync<int>(
            "sp_DeleteInstagramReel",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );
        return affected > 0;
    }
}

public class CustomerReviewRepository : ICustomerReviewRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public CustomerReviewRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<CustomerReview>> GetReviewsAsync()
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryAsync<CustomerReview>(
            "sp_GetCustomerReviews",
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<CustomerReview> UpsertReviewAsync(UpsertCustomerReviewDto dto)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QuerySingleAsync<CustomerReview>(
            "sp_UpsertCustomerReview",
            new
            {
                dto.Id,
                dto.Author,
                dto.Occasion,
                dto.City,
                dto.Rating,
                dto.ReviewText,
                dto.PhotoUrl,
                dto.IsVerified,
                dto.DisplayOrder
            },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<bool> DeleteReviewAsync(string id)
    {
        using var conn = _connectionFactory.CreateConnection();
        var affected = await conn.ExecuteScalarAsync<int>(
            "sp_DeleteCustomerReview",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );
        return affected > 0;
    }
}

public class SiteSettingRepository : ISiteSettingRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public SiteSettingRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<SiteSetting>> GetSettingsAsync(string? sectionName = null)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QueryAsync<SiteSetting>(
            "sp_GetSiteSettings",
            new { SectionName = sectionName },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<SiteSetting> UpsertSettingAsync(UpsertSiteSettingDto dto)
    {
        using var conn = _connectionFactory.CreateConnection();
        return await conn.QuerySingleAsync<SiteSetting>(
            "sp_UpsertSiteSetting",
            new
            {
                dto.SettingKey,
                dto.SettingValue,
                dto.SectionName
            },
            commandType: CommandType.StoredProcedure
        );
    }
}

