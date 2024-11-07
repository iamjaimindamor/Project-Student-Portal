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

        [HttpDelete("/remove-assigned-subject")]
        public IActionResult RemoveAssignedSubject(string facultyID)
        {
            var result = examService.DeleteAssignedSubject(facultyID);

            if (result)
            {
                return Ok("Deleted Successfully" + facultyID + "Assigned Subject");
            }
            else
            {
                return Ok("No Assignment Found");
            }
        }

        [HttpDelete("/delete-subject")]
        public IActionResult DeleteSubject(Guid subjectID)
        {
            var result = examService.DeleteSubject(subjectID);

            if (result)
            {
                return Ok("Subject Deleted");
            }
            else
            {
                return Ok("Subject Not Found");
            }
        }

        [HttpDelete("/delete-exam")]
        public IActionResult DeleteExam(Guid examId)
        {
            var result = examService.DeleteExam(examId);

            if (result)
            {
                return Ok("Exam Deleted");
            }
            else
            {
                return Ok("Exam Not Found");
            }
        }

        [HttpDelete("/delete-grade-history")]
        public IActionResult DeleteMarks(Guid Id)
        {
            var result = examService.DeleteGradeHistory(Id);
            if (result)
            {
                return Ok("Grade History Deleted");
            }
            else
            {
                return Ok("Grade History Found");
            }
        }

        [HttpDelete("/delete-opted-subject")]
        public IActionResult DeleteOptedSubject(Guid Id)
        {
            var result = examService.DeleteOptedSubject(Id);
            if (result)
            {
                return Ok("Deleted Opted Selection");
            }
            else
            {
                return Ok("Opted Selection Not Found");
            }
        }

        [HttpPut("/update-exam-state")]
        public async Task<IActionResult> UpdateExamState(Guid ExamId, Exam UpdatedExamState)
        {
            var result = await examService.UpdateExamStatus(ExamId, UpdatedExamState);
            if (result.Item1)
            {
                return Ok(result.Item2);
            }
            else
            {
                return BadRequest("Failed To Update Exam Status");
            }

        }

        [HttpPut("/lock-unlock-subject-select")]
        public async Task<IActionResult> LockingSubjectSelection(string studentId , bool lockingstatus)
        {
            var result = await examService.LockInUnlockSubject(studentId, lockingstatus);

            if (result)
            {
                return Ok($"Locking State is to {lockingstatus} Successfully");
            }

            return BadRequest("Update Locking State Failed");
        }


    }
}
