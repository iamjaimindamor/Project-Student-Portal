using Microsoft.AspNetCore.Mvc;
using QuickApp8._0.Server.Core.Entities;

namespace QuickApp8._0.Server.Core.Interfaces
{
    public interface IExamService
    {
        IList<Exam> GetExamList();
        Task<Exam> CreateExam(Exam exam);
        IList<AssignedSubject> GetAssignedSubjects();
        Task<AssignedSubject> AssignSubject(AssignedSubject assignSubject);
        IList<Subject> GetSubjects();
        Task<Subject> CreateSubject(Subject subject);
        IList<OptedSubjectByStudents> GetAllStudentsOptedSubject();
        Task<OptedSubjectByStudents> OptingSubject(OptedSubjectByStudents optingSubject);
        IList<GradeHistory> GetAllStudentGrade();
        Task<GradeHistory> CreateGradeHistory(GradeHistory gradeHistory);
    }
}
