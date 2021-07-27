USE [master]
GO

IF db_id('RestroomReview') IS NULL
  CREATE DATABASE RestroomReview
GO

USE RestroomReview
GO


DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [Bathroom];
DROP TABLE IF EXISTS [UserProfile];
GO 


CREATE TABLE [UserProfile] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] NVARCHAR(255) NOT NULL,
  [FirstName] NVARCHAR(50) NOT NULL,
  [LastName] NVARCHAR(100) NOT NULL,
  [Email] NVARCHAR(255) NOT NULL,
  

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Bathroom] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [PlaceName] NVARCHAR(255) NOT NULL,
  [Address] NVARCHAR(255) NOT NULL,
  [DateCreated] DATE NOT NULL,
  [UserId] INTEGER NOT NULL,

  CONSTRAINT FK_Bathroom_UserProfile FOREIGN KEY (UserId) REFERENCES UserProfile(Id)
)

CREATE TABLE [Review] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Comment] NVARCHAR(1000) NOT NULL,
  [DateCreated] DATE NOT NULL,
  [Rating] INTEGER NOT NULL,
  [UserId] INTEGER NOT NULL,
  [BathroomId] INTEGER NOT NULL,

  CONSTRAINT FK_Review_UserProfile FOREIGN KEY (UserId) REFERENCES UserProfile(id),
  CONSTRAINT FK_Review_Bathroom FOREIGN KEY (BathroomId) REFERENCES Bathroom(id)
)
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirebaseUserId], [FirstName], [LastName], [Email])
VALUES
  (1, 'cc1FG9R8jAaYuPSjaJeoRkRue2F2', 'Foo', 'Barington', 'foo@bar.com'),
  (2, '7ub0TyoQxfUaWDPOHnNRVtKhLEz2', 'Bar', 'Bazaar', 'bar@baz.com');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Bathroom] ON
INSERT INTO [Bathroom]
  ([Id], [UserId], [DateCreated], [Address], [PlaceName])
VALUES
  (1, 1, '2021-07-23', '2000 Church St, Nashville, TN 37203', 'St. Thomas Hospital Midtown'),
  (2, 1, '2021-07-24', '3300 Dickerson Pike, Nashville, TN 37207', 'McDonalds'), 
  (3, 2, '2021-07-23', '615 Church St, Nashville, TN 37219', 'Nashville Public Library')
SET IDENTITY_INSERT [Bathroom] OFF


SET IDENTITY_INSERT [Review] ON
INSERT INTO [Review]
  ([Id], [Comment], [DateCreated], [Rating], [UserId], [BathroomId])
VALUES 
  (1, 'This is the best bathroom I''ve ever been in. It is so clean that I could LIVE here.', '2021-07-23', 10, 1, 1), 
  (2, 'This place is amazing! The only problem I can think of is that they don''t pay you for coming.', '2021-07-23', 9, 2, 1),
  (3, 'This place is terrible. Definitely fits the establishment thuogh.', '2021-07-23', 1, 1, 2)
SET IDENTITY_INSERT [Review] OFF
  