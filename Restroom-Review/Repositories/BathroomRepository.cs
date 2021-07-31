using Microsoft.Extensions.Configuration;
using Restroom_Review.Utils;
using RestroomReview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestroomReview.Repositories
{
    public class BathroomRepository : BaseRepository, IBathroomRepository
    {
        public BathroomRepository(IConfiguration configuration) : base(configuration) { }

        public List<Bathroom> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, PlaceName, Address, DateCreated, UserId
                            FROM Bathroom";
                    var reader = cmd.ExecuteReader();

                    var bathroom = new List<Bathroom>();

                    while (reader.Read())
                    {
                        bathroom.Add(new Bathroom()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PlaceName = DbUtils.GetString(reader, "PlaceName"),
                            Address = DbUtils.GetString(reader, "Address"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserId = DbUtils.GetInt(reader, "UserId")
                        });
                    }
                    reader.Close();

                    return bathroom;
                }
            }
        }

        public Bathroom GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, PlaceName, Address, DateCreated, UserId 
                            FROM Bathroom
                    Where Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Bathroom bathroom = null;
                    if (reader.Read())
                    {
                        bathroom = new Bathroom()
                        {
                            Id = id,
                            PlaceName = DbUtils.GetString(reader, "PlaceName"),
                            Address = DbUtils.GetString(reader, "Address")
                        };
                    }

                    reader.Close();

                    return bathroom;
                }
            }
        }

        public void Add(Bathroom bathroom)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Bathroom (PlaceName, Address, DateCreated, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@PlaceName, @Address, @DateCreated, @UserId)";
                    DbUtils.AddParameter(cmd, "@PlaceName", bathroom.PlaceName);
                    DbUtils.AddParameter(cmd, "@Address", bathroom.Address);
                    DbUtils.AddParameter(cmd, "@DateCreated", bathroom.DateCreated);
                    DbUtils.AddParameter(cmd, "@UserId", bathroom.UserId);

                    bathroom.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Bathroom> Search(string criterion, bool sortDescending)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"
              SELECT Id, PlaceName, Address, DateCreated, UserId 
                            FROM Bathroom
               WHERE PlaceName LIKE @Criterion OR Address LIKE @Criterion";

                    if (sortDescending)
                    {
                        sql += " ORDER BY DateCreated DESC";
                    }
                    else
                    {
                        sql += " ORDER BY DateCreated";
                    }

                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var bathrooms = new List<Bathroom>();
                    while (reader.Read())
                    {
                        bathrooms.Add(new Bathroom()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PlaceName = DbUtils.GetString(reader, "PlaceName"),
                            Address = DbUtils.GetString(reader, "Address"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                        });
                    }

                    reader.Close();

                    return bathrooms;
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
                    cmd.CommandText = @"DELETE From Review WHERE BathroomId=@Id
                        DELETE From Bathroom WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
