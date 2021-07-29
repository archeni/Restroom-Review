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
    public class BathroomController : ControllerBase
    {
        private readonly IBathroomRepository _bathroomRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public BathroomController(IBathroomRepository bathroomRepository, IUserProfileRepository userProfileRepository)
        {
            _bathroomRepository = bathroomRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bathroomRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var bathroom = _bathroomRepository.GetById(id);
            if (bathroom == null)
            {
                return NotFound();
            }
            return Ok(bathroom);
        }

        [HttpPost]
        public IActionResult Add(Bathroom bathroom)
        {
            bathroom.DateCreated = DateTime.Now;

            var currentUserProfile = GetUserProfile();
            bathroom.UserId = currentUserProfile.Id;
            _bathroomRepository.Add(bathroom);
            return CreatedAtAction("Get", new { id = bathroom.Id }, bathroom);
        }

        private UserProfile GetUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_bathroomRepository.Search(q, sortDesc));
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _bathroomRepository.Delete(id);
            return NoContent();
        }
    }
}
