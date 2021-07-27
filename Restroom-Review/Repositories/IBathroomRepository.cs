using RestroomReview.Models;
using System.Collections.Generic;

namespace RestroomReview.Repositories
{
    public interface IBathroomRepository
    {
        List<Bathroom> GetAll();
        Bathroom GetById(int id);
    }
}