CREATE TABLE [UserProfile] (
  [id] int,
  [Email] nvarchar(255),
  [FireBaseUserId] nvarchar(255),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [CreateDate] datetime
)
GO

CREATE TABLE [Bathroom] (
  [Id] INTEGER,
  [UserId] INTEGER,
  [DateCreated] datetime,
  [Address] VARCHAR,
  [PlaceName] VARCHAR
)
GO

CREATE TABLE [Review] (
  [Id] INTEGER,
  [Comment] VARCHAR,
  [DateCreated] datetime,
  [Rating] INTEGER,
  [UserId] INTEGER,
  [BathroomId] INTEGER
)
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Bathroom] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([BathroomId]) REFERENCES [Bathroom] ([Id])
GO
