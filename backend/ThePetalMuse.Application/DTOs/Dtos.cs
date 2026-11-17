namespace ThePetalMuse.Application.DTOs;

public class UpsertCategoryDto
{
    public string Id { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? ShortTitle { get; set; }
    public string? Subtitle { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? Badge { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpsertCatalogWorkDto
{
    public string Id { get; set; } = string.Empty;
    public string CategoryId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? Price { get; set; }
    public decimal? PriceNumber { get; set; }
    public string? Description { get; set; }
    public string? Badge { get; set; }
    public string CoverImage { get; set; } = string.Empty;
    public int WorkOrder { get; set; }
    public string? Tags { get; set; }
    public bool IsSignature { get; set; }
    public bool IsActive { get; set; } = true;

    // Optional list of additional images/videos URLs to attach
    public List<string>? AdditionalImages { get; set; }
    public string? VideoUrl { get; set; }
}

public class AddWorkMediaDto
{
    public string WorkId { get; set; } = string.Empty;
    public string MediaType { get; set; } = "image";
    public string MediaUrl { get; set; } = string.Empty;
    public string? PublicId { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Caption { get; set; }
    public int DisplayOrder { get; set; }
}

public class UpsertInstagramReelDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Caption { get; set; }
    public string VideoUrl { get; set; } = string.Empty;
    public string? CoverImageUrl { get; set; }
    public string? PublicId { get; set; }
    public string? ViewsDisplay { get; set; }
    public string? LikesDisplay { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpsertCustomerReviewDto
{
    public string Id { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string? Occasion { get; set; }
    public string? City { get; set; }
    public int Rating { get; set; } = 5;
    public string ReviewText { get; set; } = string.Empty;
    public string? PhotoUrl { get; set; }
    public bool IsVerified { get; set; } = true;
    public int DisplayOrder { get; set; }
}

public class UpsertSiteSettingDto
{
    public string SettingKey { get; set; } = string.Empty;
    public string SettingValue { get; set; } = string.Empty;
    public string SectionName { get; set; } = string.Empty;
}

public class MediaUploadResultDto
{
    public string SecureUrl { get; set; } = string.Empty;
    public string PublicId { get; set; } = string.Empty;
    public string Format { get; set; } = string.Empty;
    public string ResourceType { get; set; } = "image";
    public long Bytes { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public double? Duration { get; set; }
}

