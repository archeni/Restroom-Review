using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestroomReview.Models;
using RestroomReview.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace RestroomReview.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IReviewRepository _reviewRepository;

        public ReviewController(IReviewRepository reviewRepository, IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
            _reviewRepository = reviewRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var reviews = _reviewRepository.GetById(id);
            if (reviews == null)
            {
                return NotFound();
            }
            return Ok(reviews);
        }

        [HttpPost]
        public IActionResult Add(Review review)
        {
            review.DateCreated = DateTime.Now;

            var currentUserProfile = GetUserProfile();
            review.UserId = currentUserProfile.Id;
            _reviewRepository.Add(review);
            return CreatedAtAction("Get", new { id = review.Id }, review);
        }

        private UserProfile GetUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _reviewRepository.Delete(id);
            return NoContent();
        }
    }
}
