using Microsoft.AspNetCore.Mvc;
using MeetingApp.Models;
using System.Linq;

namespace MeetingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingController : ControllerBase
    {
        // GET: api/meeting/apply
        [HttpGet("apply")]
        public ActionResult Apply()
        {
            return Ok(); // Simply returns 200 OK to show endpoint is reachable
        }

        // POST: api/meeting/apply
        [HttpPost("apply")]
        public ActionResult Apply([FromBody] UserInfo model)
        {
            if (ModelState.IsValid)
            {
                Repository.CreateUser(model);
                var userCount = Repository.Users.Count(info => info.WillYouAttend == true);
                return Ok(new { Message = "Thank you for applying!", UserCount = userCount });
            }
            return BadRequest(ModelState);
        }

        // GET: api/meeting/list
        [HttpGet("list")]
        public ActionResult List()
        {
            var users = Repository.Users;
            return Ok(users);
        }

        // GET: api/meeting/details/{id}
        [HttpGet("details/{id}")]
        public ActionResult Details(int id)
        {
            var user = Repository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: api/meeting/info
        [HttpGet("info")]
        public ActionResult Info()
        {
            int userCount = Repository.Users.Count(info => info.WillYouAttend == true);
            var meetingInfo = new Meetinginfo
            {
                Id = 1,
                Location = "Gdansk, Old Town",
                Date = new DateTime(2024, 09, 17, 20, 0, 0),
                NumberOfPeople = userCount
            };
            return Ok(meetingInfo);
        }
    }
}
