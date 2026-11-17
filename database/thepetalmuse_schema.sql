USE thepetalmuse;
GO

-- =============================================================================
-- 1. TABLES CREATION
-- =============================================================================

-- Categories Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categories')
BEGIN
    CREATE TABLE Categories (
        Id NVARCHAR(50) PRIMARY KEY,
        Slug NVARCHAR(100) NOT NULL UNIQUE,
        Name NVARCHAR(200) NOT NULL,
        ShortTitle NVARCHAR(100) NULL,
        Subtitle NVARCHAR(300) NULL,
        Description NVARCHAR(MAX) NULL,
        ImageUrl NVARCHAR(MAX) NULL,
        Badge NVARCHAR(100) NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- CatalogWorks (Products / Works) Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CatalogWorks')
BEGIN
    CREATE TABLE CatalogWorks (
        Id NVARCHAR(50) PRIMARY KEY,
        CategoryId NVARCHAR(50) NOT NULL,
        Title NVARCHAR(200) NOT NULL,
        Slug NVARCHAR(150) NULL,
        Price NVARCHAR(100) NULL,
        PriceNumber DECIMAL(18,2) NULL,
        Description NVARCHAR(MAX) NULL,
        Badge NVARCHAR(100) NULL,
        CoverImage NVARCHAR(MAX) NOT NULL,
        WorkOrder INT NOT NULL DEFAULT 0,
        Tags NVARCHAR(500) NULL,
        IsSignature BIT NOT NULL DEFAULT 0,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_CatalogWorks_Category FOREIGN KEY (CategoryId) REFERENCES Categories(Id) ON DELETE CASCADE
    );
END
GO

-- WorkMedia (Additional Photos & Videos per Work)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'WorkMedia')
BEGIN
    CREATE TABLE WorkMedia (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        WorkId NVARCHAR(50) NOT NULL,
        MediaType NVARCHAR(20) NOT NULL DEFAULT 'image', -- 'image' or 'video'
        MediaUrl NVARCHAR(MAX) NOT NULL,
        PublicId NVARCHAR(250) NULL,
        ThumbnailUrl NVARCHAR(MAX) NULL,
        Caption NVARCHAR(250) NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_WorkMedia_Work FOREIGN KEY (WorkId) REFERENCES CatalogWorks(Id) ON DELETE CASCADE
    );
END
GO

-- InstagramReels Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'InstagramReels')
BEGIN
    CREATE TABLE InstagramReels (
        Id NVARCHAR(50) PRIMARY KEY,
        Title NVARCHAR(250) NOT NULL,
        Caption NVARCHAR(MAX) NULL,
        VideoUrl NVARCHAR(MAX) NOT NULL,
        CoverImageUrl NVARCHAR(MAX) NULL,
        PublicId NVARCHAR(250) NULL,
        ViewsDisplay NVARCHAR(50) NULL,
        LikesDisplay NVARCHAR(50) NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- CustomerReviews Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CustomerReviews')
BEGIN
    CREATE TABLE CustomerReviews (
        Id NVARCHAR(50) PRIMARY KEY,
        Author NVARCHAR(150) NOT NULL,
        Occasion NVARCHAR(150) NULL,
        City NVARCHAR(100) NULL,
        Rating INT NOT NULL DEFAULT 5,
        ReviewText NVARCHAR(MAX) NOT NULL,
        PhotoUrl NVARCHAR(MAX) NULL,
        IsVerified BIT NOT NULL DEFAULT 1,
        DisplayOrder INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- SiteSettings / Content Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SiteSettings')
BEGIN
    CREATE TABLE SiteSettings (
        SettingKey NVARCHAR(100) PRIMARY KEY,
        SettingValue NVARCHAR(MAX) NOT NULL,
        SectionName NVARCHAR(100) NOT NULL,
        UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- =============================================================================
-- 2. STORED PROCEDURES (Dapper SP Approach)
-- =============================================================================

-- Categories Stored Procedures
CREATE OR ALTER PROCEDURE sp_GetCategories
    @OnlyActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Categories
    WHERE (@OnlyActive = 0 OR IsActive = 1)
    ORDER BY DisplayOrder ASC, Name ASC;
END
GO

CREATE OR ALTER PROCEDURE sp_GetCategoryById
    @Id NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Categories WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE sp_UpsertCategory
    @Id NVARCHAR(50),
    @Slug NVARCHAR(100),
    @Name NVARCHAR(200),
    @ShortTitle NVARCHAR(100) = NULL,
    @Subtitle NVARCHAR(300) = NULL,
    @Description NVARCHAR(MAX) = NULL,
    @ImageUrl NVARCHAR(MAX) = NULL,
    @Badge NVARCHAR(100) = NULL,
    @DisplayOrder INT = 0,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM Categories WHERE Id = @Id)
    BEGIN
        UPDATE Categories
        SET Slug = @Slug,
            Name = @Name,
            ShortTitle = @ShortTitle,
            Subtitle = @Subtitle,
            Description = @Description,
            ImageUrl = @ImageUrl,
            Badge = @Badge,
            DisplayOrder = @DisplayOrder,
            IsActive = @IsActive,
            UpdatedAt = SYSUTCDATETIME()
        WHERE Id = @Id;
    END
    ELSE
    BEGIN
        INSERT INTO Categories (Id, Slug, Name, ShortTitle, Subtitle, Description, ImageUrl, Badge, DisplayOrder, IsActive)
        VALUES (@Id, @Slug, @Name, @ShortTitle, @Subtitle, @Description, @ImageUrl, @Badge, @DisplayOrder, @IsActive);
    END

    SELECT * FROM Categories WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE sp_DeleteCategory
    @Id NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Categories WHERE Id = @Id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- CatalogWorks Stored Procedures
CREATE OR ALTER PROCEDURE sp_GetCatalogWorks
    @CategoryId NVARCHAR(50) = NULL,
    @OnlyActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM CatalogWorks
    WHERE (@CategoryId IS NULL OR CategoryId = @CategoryId)
      AND (@OnlyActive = 0 OR IsActive = 1)
    ORDER BY WorkOrder ASC, CreatedAt DESC;
END
GO

CREATE OR ALTER PROCEDURE sp_GetWorkById
    @Id NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM CatalogWorks WHERE Id = @Id;
    SELECT * FROM WorkMedia WHERE WorkId = @Id ORDER BY DisplayOrder ASC;
END
GO

CREATE OR ALTER PROCEDURE sp_UpsertCatalogWork
    @Id NVARCHAR(50),
    @CategoryId NVARCHAR(50),
    @Title NVARCHAR(200),
    @Slug NVARCHAR(150) = NULL,
    @Price NVARCHAR(100) = NULL,
    @PriceNumber DECIMAL(18,2) = NULL,
    @Description NVARCHAR(MAX) = NULL,
    @Badge NVARCHAR(100) = NULL,
    @CoverImage NVARCHAR(MAX),
    @WorkOrder INT = 0,
    @Tags NVARCHAR(500) = NULL,
    @IsSignature BIT = 0,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM CatalogWorks WHERE Id = @Id)
    BEGIN
        UPDATE CatalogWorks
        SET CategoryId = @CategoryId,
            Title = @Title,
            Slug = @Slug,
            Price = @Price,
            PriceNumber = @PriceNumber,
            Description = @Description,
            Badge = @Badge,
            CoverImage = @CoverImage,
            WorkOrder = @WorkOrder,
            Tags = @Tags,
            IsSignature = @IsSignature,
            IsActive = @IsActive,
            UpdatedAt = SYSUTCDATETIME()
        WHERE Id = @Id;
    END
    ELSE
    BEGIN
        INSERT INTO CatalogWorks (Id, CategoryId, Title, Slug, Price, PriceNumber, Description, Badge, CoverImage, WorkOrder, Tags, IsSignature, IsActive)
        VALUES (@Id, @CategoryId, @Title, @Slug, @Price, @PriceNumber, @Description, @Badge, @CoverImage, @WorkOrder, @Tags, @IsSignature, @IsActive);
    END

    SELECT * FROM CatalogWorks WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE sp_DeleteCatalogWork
    @Id NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM CatalogWorks WHERE Id = @Id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- WorkMedia Stored Procedures
CREATE OR ALTER PROCEDURE sp_AddWorkMedia
    @WorkId NVARCHAR(50),
    @MediaType NVARCHAR(20),
    @MediaUrl NVARCHAR(MAX),
    @PublicId NVARCHAR(250) = NULL,
    @ThumbnailUrl NVARCHAR(MAX) = NULL,
    @Caption NVARCHAR(250) = NULL,
    @DisplayOrder INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO WorkMedia (WorkId, MediaType, MediaUrl, PublicId, ThumbnailUrl, Caption, DisplayOrder)
    VALUES (@WorkId, @MediaType, @MediaUrl, @PublicId, @ThumbnailUrl, @Caption, @DisplayOrder);

    SELECT * FROM WorkMedia WHERE Id = SCOPE_IDENTITY();
END
GO

CREATE OR ALTER PROCEDURE sp_DeleteWorkMedia
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM WorkMedia WHERE Id = @Id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- InstagramReels Stored Procedures
CREATE OR ALTER PROCEDURE sp_GetInstagramReels
    @OnlyActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM InstagramReels
    WHERE (@OnlyActive = 0 OR IsActive = 1)
    ORDER BY DisplayOrder ASC, CreatedAt DESC;
END
GO

CREATE OR ALTER PROCEDURE sp_UpsertInstagramReel
    @Id NVARCHAR(50),
    @Title NVARCHAR(250),
    @Caption NVARCHAR(MAX) = NULL,
    @VideoUrl NVARCHAR(MAX),
    @CoverImageUrl NVARCHAR(MAX) = NULL,
    @PublicId NVARCHAR(250) = NULL,
    @ViewsDisplay NVARCHAR(50) = NULL,
    @LikesDisplay NVARCHAR(50) = NULL,
    @DisplayOrder INT = 0,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM InstagramReels WHERE Id = @Id)
    BEGIN
        UPDATE InstagramReels
        SET Title = @Title,
            Caption = @Caption,
            VideoUrl = @VideoUrl,
            CoverImageUrl = @CoverImageUrl,
            PublicId = @PublicId,
            ViewsDisplay = @ViewsDisplay,
            LikesDisplay = @LikesDisplay,
            DisplayOrder = @DisplayOrder,
            IsActive = @IsActive
        WHERE Id = @Id;
    END
    ELSE
    BEGIN
        INSERT INTO InstagramReels (Id, Title, Caption, VideoUrl, CoverImageUrl, PublicId, ViewsDisplay, LikesDisplay, DisplayOrder, IsActive)
        VALUES (@Id, @Title, @Caption, @VideoUrl, @CoverImageUrl, @PublicId, @ViewsDisplay, @LikesDisplay, @DisplayOrder, @IsActive);
    END

    SELECT * FROM InstagramReels WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE sp_DeleteInstagramReel
    @Id NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM InstagramReels WHERE Id = @Id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- CustomerReviews Stored Procedures
CREATE OR ALTER PROCEDURE sp_GetCustomerReviews
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM CustomerReviews ORDER BY DisplayOrder ASC, CreatedAt DESC;
END
GO

CREATE OR ALTER PROCEDURE sp_UpsertCustomerReview
    @Id NVARCHAR(50),
    @Author NVARCHAR(150),
    @Occasion NVARCHAR(150) = NULL,
    @City NVARCHAR(100) = NULL,
    @Rating INT = 5,
    @ReviewText NVARCHAR(MAX),
    @PhotoUrl NVARCHAR(MAX) = NULL,
    @IsVerified BIT = 1,
    @DisplayOrder INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM CustomerReviews WHERE Id = @Id)
    BEGIN
        UPDATE CustomerReviews
        SET Author = @Author,
            Occasion = @Occasion,
            City = @City,
            Rating = @Rating,
            ReviewText = @ReviewText,
            PhotoUrl = @PhotoUrl,
            IsVerified = @IsVerified,
            DisplayOrder = @DisplayOrder
        WHERE Id = @Id;
    END
    ELSE
    BEGIN
        INSERT INTO CustomerReviews (Id, Author, Occasion, City, Rating, ReviewText, PhotoUrl, IsVerified, DisplayOrder)
        VALUES (@Id, @Author, @Occasion, @City, @Rating, @ReviewText, @PhotoUrl, @IsVerified, @DisplayOrder);
    END

    SELECT * FROM CustomerReviews WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE sp_DeleteCustomerReview
    @Id NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM CustomerReviews WHERE Id = @Id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- SiteSettings Stored Procedures
CREATE OR ALTER PROCEDURE sp_GetSiteSettings
    @SectionName NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM SiteSettings
    WHERE (@SectionName IS NULL OR SectionName = @SectionName);
END
GO

CREATE OR ALTER PROCEDURE sp_UpsertSiteSetting
    @SettingKey NVARCHAR(100),
    @SettingValue NVARCHAR(MAX),
    @SectionName NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM SiteSettings WHERE SettingKey = @SettingKey)
    BEGIN
        UPDATE SiteSettings
        SET SettingValue = @SettingValue,
            SectionName = @SectionName,
            UpdatedAt = SYSUTCDATETIME()
        WHERE SettingKey = @SettingKey;
    END
    ELSE
    BEGIN
        INSERT INTO SiteSettings (SettingKey, SettingValue, SectionName)
        VALUES (@SettingKey, @SettingValue, @SectionName);
    END

    SELECT @SettingKey AS SettingKey, 'SUCCESS' AS Status;
END
GO

