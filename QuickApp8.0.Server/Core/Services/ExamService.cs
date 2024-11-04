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
            applicationDbContext.gradeHistory.Update(gradeHistory);
            await applicationDbContext.SaveChangesAsync();
            return gradeHistory;
        }

        public async Task<Subject> CreateSubject(Subject subject)
        {
            await applicationDbContext.subjects.AddAsync(subject);
            await applicationDbContext.SaveChangesAsync();
            return subject;

        }

        public bool DeleteAssignedSubject(string facultyID)
        {
            var isExist = applicationDbContext.assignedSubjects.FirstOrDefault(x=>x.FacultyID == facultyID);
            if (isExist.Id != null)
            {
                applicationDbContext.assignedSubjects.Remove(isExist);
                applicationDbContext.SaveChanges();
                return true;
            }
            return false;
        }

        public bool DeleteExam(Guid examID)
        {
            var isExam = applicationDbContext.exams.FirstOrDefault(x => x.ExamId == examID);
            if(isExam.ExamId != null)
            {
                applicationDbContext.exams.Remove(isExam);
                applicationDbContext.SaveChanges();
                return true;
            }

            return false;
        }

        public bool DeleteGradeHistory(Guid gradeSerial)
        {
            var isGrade = applicationDbContext.gradeHistory.FirstOrDefault(x => x.SerialNumber == gradeSerial);
            if (isGrade.SerialNumber != null)
            {
                applicationDbContext.gradeHistory.Remove(isGrade);
                applicationDbContext.SaveChanges();
                return true;
            }

            return false;
        }

        public bool DeleteOptedSubject(Guid Id)
        {
            var isOptedSubject = applicationDbContext.SubbyStudents.FirstOrDefault(x => x.Id== Id);
            if (isOptedSubject.Id!= null)
            {
                applicationDbContext.SubbyStudents.Remove(isOptedSubject);
                applicationDbContext.SaveChanges();
                return true;
            }

            return false;
        }

        public bool DeleteSubject(Guid subjectID)
        {
            var isSubject = applicationDbContext.subjects.FirstOrDefault(x => x.SubjectID == subjectID);
            if(isSubject != null)
            {
                applicationDbContext.subjects.Remove(isSubject);
                applicationDbContext.SaveChanges();
                return true;
            }

            return false;
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
