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
                            SELECT Id, PlaceName, Address
                            FROM Bathroom
                            ";
                    var reader = cmd.ExecuteReader();

                    var bathroom = new List<Bathroom>();

                    while (reader.Read())
                    {
                        bathroom.Add(new Bathroom()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PlaceName = reader.GetString(reader.GetOrdinal("PlaceName")),
                            Address = DbUtils.GetString(reader, "Address")
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
                    cmd.CommandText = @"SELECT Id, PlaceName, Address 
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
    }
}
