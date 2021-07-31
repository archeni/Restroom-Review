using RestroomReview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestroomReview.Repositories
{
    public interface IReviewRepository
    {
        List<Review> GetAll();
        List<Review> GetByBathroomId(int id);
        Review GetById(int id);
        void Add(Review bathroom);
        void Delete(int id);
        void Update(Review review);
    }
}
