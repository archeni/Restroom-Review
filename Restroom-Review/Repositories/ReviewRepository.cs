using Microsoft.Extensions.Configuration;
using Restroom_Review.Utils;
using RestroomReview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestroomReview.Repositories
{
    public class ReviewRepository : BaseRepository, IReviewRepository
    {
        public ReviewRepository(IConfiguration configuration) : base(configuration) { }
        public void Add(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Review (Comment, Rating, DateCreated, UserId, BathroomId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Comment, @Rating, @DateCreated, @UserId, @BathroomId)";
                    DbUtils.AddParameter(cmd, "@Comment", review.Comment);
                    DbUtils.AddParameter(cmd, "@Rating", review.Rating);
                    DbUtils.AddParameter(cmd, "@DateCreated", review.DateCreated);
                    DbUtils.AddParameter(cmd, "@UserId", review.UserId);
                    DbUtils.AddParameter(cmd, "@BathroomId", review.BathroomId);

                    review.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE Review WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Review> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Comment, DateCreated, Rating, UserId, BathroomId
                            FROM Review";
                    var reader = cmd.ExecuteReader();

                    var review = new List<Review>();

                    while (reader.Read())
                    {
                        review.Add(new Review()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Comment = DbUtils.GetString(reader, "Comment"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            BathroomId = DbUtils.GetInt(reader, "BathroomId")
                        });
                    }
                    reader.Close();

                    return review;
                }
            }
        }

        public Review GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Comment, DateCreated, Rating, UserId, BathroomId
                            FROM Review
                    Where Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Review review = null;
                    if (reader.Read())
                    {
                        review = new Review()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Comment = DbUtils.GetString(reader, "Comment"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            BathroomId = DbUtils.GetInt(reader, "BathroomId")
                        };
                    }

                    reader.Close();

                    return review;
                }
            }
        }

        public List<Review> GetByBathroomId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Comment, DateCreated, Rating, UserId, BathroomId
                            FROM Review
                    Where BathroomId = @BathroomId";

                    DbUtils.AddParameter(cmd, "@BathroomId", id);

                    var reader = cmd.ExecuteReader();

                    var reviews = new List<Review>();
                    while (reader.Read())
                    {
                        reviews.Add(new Review()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Comment = DbUtils.GetString(reader, "Comment"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            BathroomId = id
                        });
                    }

                    reader.Close();

                    return reviews;
                }
            }
        }

        public void Update(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Review
                           SET Comment = @Comment,
                            Rating = @Rating
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Comment", review.Comment);
                    DbUtils.AddParameter(cmd, "@Rating", review.Rating);
                    DbUtils.AddParameter(cmd, "@Id", review.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
