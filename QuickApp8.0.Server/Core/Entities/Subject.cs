using System.ComponentModel.DataAnnotations;

namespace QuickApp8._0.Server.Core.Entities
{
    public class Subject
    {
        [Key]
        public Guid SubjectID { get; set; }

        public string? SubjectName { get; set; }
    }
}
