using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestroomReview.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public DateTime DateCreated { get; set; }
        public int Rating { get; set; }
        public int UserId { get; set; }
        public int BathroomId { get; set; }
    }
}
