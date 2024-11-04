using System.ComponentModel.DataAnnotations;

namespace QuickApp8._0.Server.Core.Entities
{
    public class OptedSubjectByStudents
    {
        [Key]
        public Guid Id { get; set; }
        public string? StudentId { get; set; }

        public Guid SubjectID { get; set; }

    }
}
