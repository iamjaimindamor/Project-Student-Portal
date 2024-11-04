using System.ComponentModel.DataAnnotations;

namespace QuickApp8._0.Server.Core.Entities
{
    public class Exam
    {
        [Key]
        public Guid ExamId { get; set; }

        public string? ExamName { get; set; }

        public int ExamYear { get; set; }

        public ExamState ExamStatus { get; set; } 
    }

    public enum ExamState
    {
        INITIALIZING,
        ONGOING,
        ENDED
    }
}
