using Microsoft.AspNetCore.Mvc;
using QuickApp8._0.Server.Core.Entities;

namespace QuickApp8._0.Server.Core.Interfaces
{
    public interface IExamService
    {
        IList<Exam> GetExamList();
        Task<Exam> CreateExam(Exam exam);
        Task<(bool,Exam)> UpdateExamStatus(Guid ExamId,Exam updatedState);
        bool DeleteExam(Guid examID);
        IList<AssignedSubject> GetAssignedSubjects();
        Task<AssignedSubject> AssignSubject(AssignedSubject assignSubject);
        bool DeleteAssignedSubject(string facultyID);
        IList<Subject> GetSubjects();
        Task<Subject> CreateSubject(Subject subject);
        bool DeleteSubject(Guid subjectID);
        IList<OptedSubjectByStudents> GetAllStudentsOptedSubject();
        Task<OptedSubjectByStudents> OptingSubject(OptedSubjectByStudents optingSubject);
        bool DeleteOptedSubject (Guid Id);
        IList<GradeHistory> GetAllStudentGrade();
        Task<GradeHistory> CreateGradeHistory(GradeHistory gradeHistory);
        bool DeleteGradeHistory(Guid gradeSerialNumber);
    }
}
