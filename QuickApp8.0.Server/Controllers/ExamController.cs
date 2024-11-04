using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickApp8._0.Server.Core.Constants;
using QuickApp8._0.Server.Core.Entities;
using QuickApp8._0.Server.Core.Interfaces;

namespace QuickApp8._0.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IExamService examService;

        public ExamController(IExamService examService)
        {
            this.examService = examService;
        }

        [HttpGet("/get-exams-list")]
        public IActionResult GetExamDetails()
        {
            var exam = examService.GetExamList();
            return Ok(exam);
        }

        //[Authorize (Roles = StaticUserRoles.OwnerAdmin)]
        [HttpPost("/start-exam")]
        public async Task<IActionResult> initializeExam(Exam exam)
        {
            if (exam != null)
            {
                var initExam = await examService.CreateExam(exam);

                return Ok(initExam);
            }
            else
            {
                return BadRequest("Bad Not Provided");
            }
        }

        [HttpGet("/assigned-faculty")]
        public IActionResult GetAssignedFaculty()
        {
            var result = examService.GetAssignedSubjects();

            return Ok(result);
        }

        [HttpPost("/assign-subject-to-faculty")]
        public async Task<IActionResult> AssignedFacultySubject(AssignedSubject assignedSubject)
        {
            var result = await examService.AssignSubject(assignedSubject);
            return Ok(result);
        }

        [HttpPost("/add-subjects")]
        public async Task<IActionResult> Add_Subject(Subject subject)
        {
            var result = await examService.CreateSubject(subject);
            return Ok(result);
        }

        [HttpGet("/get-subjects")]
        public IActionResult GetSubjects()
        {
            var result = examService.GetSubjects();
            return Ok(result);
        }

        [HttpGet("/all-students-opted-subject")]
        public IActionResult GetAllOptedSubjectList()
        {
            var result = examService.GetAllStudentsOptedSubject();
            return Ok(result);
        }

        [HttpPost("/opt-subject")]
        public async Task<IActionResult> OptSubject(OptedSubjectByStudents subjectByStudents)
        {
            var result = await examService.OptingSubject(subjectByStudents);
            return Ok(result);
        }

        [HttpGet("/results")]
        public IActionResult GetAllGrade()
        {
            var result = examService.GetAllStudentGrade();
            return Ok(result);
        }

        [HttpPost("/grading-students")]
        public async Task<IActionResult> GradingStudents(GradeHistory grades)
        {
            var result = await examService.CreateGradeHistory(grades);
            return Ok(result);  
        }
        

    }
}
