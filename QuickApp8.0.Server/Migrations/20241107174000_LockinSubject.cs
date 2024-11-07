using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuickApp8._0.Server.Migrations
{
    /// <inheritdoc />
    public partial class LockinSubject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "LockInSubject",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LockInSubject",
                table: "Users");
        }
    }
}
