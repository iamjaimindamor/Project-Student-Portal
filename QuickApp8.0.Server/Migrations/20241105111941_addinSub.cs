using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp8._0.Server.Migrations
{
    /// <inheritdoc />
    public partial class addinSub : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubjectID",
                table: "SubbyStudents");

            migrationBuilder.AddColumn<Guid>(
                name: "SelectedSubjectSubjectID",
                table: "SubbyStudents",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubbyStudents_SelectedSubjectSubjectID",
                table: "SubbyStudents",
                column: "SelectedSubjectSubjectID");

            migrationBuilder.AddForeignKey(
                name: "FK_SubbyStudents_subjects_SelectedSubjectSubjectID",
                table: "SubbyStudents",
                column: "SelectedSubjectSubjectID",
                principalTable: "subjects",
                principalColumn: "SubjectID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubbyStudents_subjects_SelectedSubjectSubjectID",
                table: "SubbyStudents");

            migrationBuilder.DropIndex(
                name: "IX_SubbyStudents_SelectedSubjectSubjectID",
                table: "SubbyStudents");

            migrationBuilder.DropColumn(
                name: "SelectedSubjectSubjectID",
                table: "SubbyStudents");

            migrationBuilder.AddColumn<Guid>(
                name: "SubjectID",
                table: "SubbyStudents",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
