using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestroomReview.Models
{
    public class Bathroom
    {
        public int Id { get; set; }
        public string PlaceName { get; set; }
        public string Address { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserId { get; set; }
    }
}
