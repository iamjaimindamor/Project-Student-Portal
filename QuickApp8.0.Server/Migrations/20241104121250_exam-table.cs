using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp8._0.Server.Migrations
{
    /// <inheritdoc />
    public partial class examtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "exams",
                columns: table => new
                {
                    ExamId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExamName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExamYear = table.Column<int>(type: "int", nullable: false),
                    ExamStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_exams", x => x.ExamId);
                });

            migrationBuilder.CreateTable(
                name: "SubbyStudents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StudentId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubjectID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubbyStudents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "subjects",
                columns: table => new
                {
                    SubjectID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubjectName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subjects", x => x.SubjectID);
                });

            migrationBuilder.CreateTable(
                name: "assignedSubjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FacultyID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FacultyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FacultySubjectSubjectID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_assignedSubjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_assignedSubjects_subjects_FacultySubjectSubjectID",
                        column: x => x.FacultySubjectSubjectID,
                        principalTable: "subjects",
                        principalColumn: "SubjectID");
                });

            migrationBuilder.CreateTable(
                name: "gradeHistory",
                columns: table => new
                {
                    SerialNumber = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GradeExamExamId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    E_SubjectSubjectID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StudentId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Marks = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gradeHistory", x => x.SerialNumber);
                    table.ForeignKey(
                        name: "FK_gradeHistory_exams_GradeExamExamId",
                        column: x => x.GradeExamExamId,
                        principalTable: "exams",
                        principalColumn: "ExamId");
                    table.ForeignKey(
                        name: "FK_gradeHistory_subjects_E_SubjectSubjectID",
                        column: x => x.E_SubjectSubjectID,
                        principalTable: "subjects",
                        principalColumn: "SubjectID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_assignedSubjects_FacultySubjectSubjectID",
                table: "assignedSubjects",
                column: "FacultySubjectSubjectID");

            migrationBuilder.CreateIndex(
                name: "IX_gradeHistory_E_SubjectSubjectID",
                table: "gradeHistory",
                column: "E_SubjectSubjectID");

            migrationBuilder.CreateIndex(
                name: "IX_gradeHistory_GradeExamExamId",
                table: "gradeHistory",
                column: "GradeExamExamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "assignedSubjects");

            migrationBuilder.DropTable(
                name: "gradeHistory");

            migrationBuilder.DropTable(
                name: "SubbyStudents");

            migrationBuilder.DropTable(
                name: "exams");

            migrationBuilder.DropTable(
                name: "subjects");
        }
    }
}
