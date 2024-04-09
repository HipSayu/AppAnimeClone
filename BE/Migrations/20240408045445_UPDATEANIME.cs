using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiBasic.Migrations
{
    /// <inheritdoc />
    public partial class UPDATEANIME : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Anime_Vides",
                table: "Video");

            migrationBuilder.AlterColumn<int>(
                name: "AnimeId",
                table: "Video",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AnimeUrl",
                table: "Anime",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Anime_Vides",
                table: "Video",
                column: "AnimeId",
                principalTable: "Anime",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Anime_Vides",
                table: "Video");

            migrationBuilder.DropColumn(
                name: "AnimeUrl",
                table: "Anime");

            migrationBuilder.AlterColumn<int>(
                name: "AnimeId",
                table: "Video",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Anime_Vides",
                table: "Video",
                column: "AnimeId",
                principalTable: "Anime",
                principalColumn: "Id");
        }
    }
}
