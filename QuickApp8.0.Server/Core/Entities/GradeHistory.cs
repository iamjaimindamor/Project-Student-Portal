using System.ComponentModel.DataAnnotations;

namespace QuickApp8._0.Server.Core.Entities
{
    public class GradeHistory
    {
        [Key]
        public Guid SerialNumber { get; set; }

        public Exam? GradeExam { get; set; }

        public Subject? E_Subject{ get; set; }

        public string? StudentId { get; set; }

        public string? Marks { get; set; }
    }
}
