using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiBasic.Migrations
{
    /// <inheritdoc />
    public partial class ADDTOKEN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserToken_idUser",
                table: "UserToken");

            migrationBuilder.CreateIndex(
                name: "IX_UserToken_idUser",
                table: "UserToken",
                column: "idUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserToken_idUser",
                table: "UserToken");

            migrationBuilder.CreateIndex(
                name: "IX_UserToken_idUser",
                table: "UserToken",
                column: "idUser",
                unique: true);
        }
    }
}
