using System.ComponentModel.DataAnnotations;

namespace QuickApp8._0.Server.Core.Entities
{
    public class AssignedSubject
    {
        [Key]
        public Guid Id { get; set;}
        public string? FacultyID { get; set; }

        public string? FacultyName { get; set; }

        public Subject? FacultySubject { get; set; }
    }
}
