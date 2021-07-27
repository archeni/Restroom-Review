using RestroomReview.Models;
using System.Collections.Generic;

namespace RestroomReview.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetById(int id);

        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}