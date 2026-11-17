namespace ThePetalMuse.Domain.Entities;

public class CatalogWork
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
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation property populated on detail fetch
    public List<WorkMedia> Media { get; set; } = new();
}

public class WorkMedia
{
    public int Id { get; set; }
    public string WorkId { get; set; } = string.Empty;
    public string MediaType { get; set; } = "image"; // "image" or "video"
    public string MediaUrl { get; set; } = string.Empty;
    public string? PublicId { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Caption { get; set; }
    public int DisplayOrder { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class InstagramReel
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
    public DateTime CreatedAt { get; set; }
}

public class CustomerReview
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
    public DateTime CreatedAt { get; set; }
}

public class SiteSetting
{
    public string SettingKey { get; set; } = string.Empty;
    public string SettingValue { get; set; } = string.Empty;
    public string SectionName { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; }
}

