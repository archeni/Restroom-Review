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
        private readonly IBathroomRepository _bathroomRepository;
        private readonly IReviewRepository _reviewRepository;

        public ReviewController(IReviewRepository reviewRepository, IBathroomRepository bathroomRepository)
        {
            _bathroomRepository = bathroomRepository;
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
    }
}
