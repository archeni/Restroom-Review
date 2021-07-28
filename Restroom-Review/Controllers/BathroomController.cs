using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestroomReview.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestroomReview.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BathroomController : ControllerBase
    {
        private readonly IBathroomRepository _bathroomRepository;
        public BathroomController(IBathroomRepository bathroomRepository)
        {
            _bathroomRepository = bathroomRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var bathrooms = _bathroomRepository.GetAll();
            return Ok(bathrooms);
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
    }
}
