using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using QuickApp8._0.Server.Core.DbContext;
using QuickApp8._0.Server.Core.Entities;
using QuickApp8._0.Server.Core.Interfaces;

namespace QuickApp8._0.Server.Core.Services
{
    public class ExamService : IExamService
    {
        private readonly ApplicationDbContext applicationDbContext;

        public ExamService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task<AssignedSubject> AssignSubject(AssignedSubject assignSubject)
        {
            applicationDbContext.assignedSubjects.Update(assignSubject);
            await applicationDbContext.SaveChangesAsync();

            return assignSubject;
        }

        public async Task<GradeHistory> CreateGradeHistory(GradeHistory gradeHistory)
        {
            await applicationDbContext.gradeHistory.AddAsync(gradeHistory);
            await applicationDbContext.SaveChangesAsync();
            return gradeHistory;
        }

        public async Task<Subject> CreateSubject(Subject subject)
        {
            await applicationDbContext.subjects.AddAsync(subject);
            await applicationDbContext.SaveChangesAsync();
            return subject;

        }

        public IList<GradeHistory> GetAllStudentGrade()
        {
            return applicationDbContext.gradeHistory.ToList();
        }

        public IList<OptedSubjectByStudents> GetAllStudentsOptedSubject()
        {
            return applicationDbContext.SubbyStudents.ToList();
        }

        public IList<AssignedSubject> GetAssignedSubjects()
        {
            return applicationDbContext.assignedSubjects.ToList();
        }

        public IList<Exam> GetExamList()
        {
            return applicationDbContext.exams.ToList();
        }

        public IList<Subject> GetSubjects()
        {
            return applicationDbContext.subjects.ToList();
        }

        public async Task<OptedSubjectByStudents> OptingSubject(OptedSubjectByStudents optingSubject)
        {
            await applicationDbContext.SubbyStudents.AddAsync(optingSubject);
            await applicationDbContext.SaveChangesAsync();
            return optingSubject;
        }

        async Task<Exam> IExamService.CreateExam(Exam exam)
        {
            await applicationDbContext.exams.AddAsync(exam);

            await applicationDbContext.SaveChangesAsync();

            return exam;
        }
    }
}
