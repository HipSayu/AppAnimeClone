﻿// <auto-generated />
using System;
using ApiBasic.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ApiBasic.Migrations
{
    [DbContext(typeof(AnimeAppContext))]
    [Migration("20240425144855_ADDTOKEN")]
    partial class ADDTOKEN
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ApiBasic.Domain.Anime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("AnimeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AnimeUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Detail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameAnime")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Quality")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Id", "NameAnime", "Age");

                    b.ToTable("Anime", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.Comment", b =>
                {
                    b.Property<int>("CommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CommentId"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ParentCommentId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("VideoId")
                        .HasColumnType("int");

                    b.HasKey("CommentId");

                    b.HasIndex("ParentCommentId");

                    b.HasIndex("UserId");

                    b.HasIndex("VideoId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("ApiBasic.Domain.Search", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("SearchKeyWord")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SearchKeyWord");

                    b.HasIndex("UserId");

                    b.ToTable("Search", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.TheLoai", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("TenTheLoai")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("TenTheLoai");

                    b.ToTable("TheLoai", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.TheLoaiAnime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AnimeId")
                        .HasColumnType("int");

                    b.Property<int>("TheLoaiId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AnimeId");

                    b.HasIndex("TheLoaiId");

                    b.ToTable("TheLoaiAnime", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BackgroundUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("SĐT")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("TieuSu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("UserType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SĐT")
                        .IsUnique();

                    b.HasIndex("Id", "UserName", "SĐT");

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.UserDisLikeVideo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("VideoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VideoId");

                    b.HasIndex("UserId", "VideoId");

                    b.ToTable("UserDisLikeVideo", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.UserDownloadVideo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("VideoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VideoId");

                    b.HasIndex("UserId", "VideoId");

                    b.ToTable("UserDownloadVideo", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.UserFollow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("FollowerId")
                        .HasColumnType("int");

                    b.Property<int>("FollowingId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FollowerId");

                    b.HasIndex("FollowingId");

                    b.ToTable("UserFollow", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.UserLikeVideo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("VideoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VideoId");

                    b.HasIndex("UserId", "VideoId");

                    b.ToTable("UserLikeVideo", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.UserToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("ExpiredAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsRevoked")
                        .HasColumnType("bit");

                    b.Property<bool>("IsUsed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("IssuedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("JwtId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("idUser")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("idUser");

                    b.ToTable("UserToken", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.UserXemVideo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("VideoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VideoId");

                    b.HasIndex("UserId", "VideoId");

                    b.ToTable("UserXemVideo", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.Video", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AnimeId")
                        .HasColumnType("int");

                    b.Property<string>("AvatarVideoUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameVideos")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("ThoiDiemTao")
                        .HasColumnType("datetime2");

                    b.Property<int>("Time")
                        .HasColumnType("int");

                    b.Property<string>("UrlVideo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("VideoId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AnimeId");

                    b.HasIndex("UserId");

                    b.HasIndex("Id", "NameVideos", "Time");

                    b.ToTable("Video", (string)null);
                });

            modelBuilder.Entity("ApiBasic.Domain.Comment", b =>
                {
                    b.HasOne("ApiBasic.Domain.Comment", "ParentComment")
                        .WithMany("ChildComments")
                        .HasForeignKey("ParentCommentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("FK_Comment_Comment");

                    b.HasOne("ApiBasic.Domain.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Comment_User");

                    b.HasOne("ApiBasic.Domain.Video", "Video")
                        .WithMany("Comments")
                        .HasForeignKey("VideoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Comment_Video");

                    b.Navigation("ParentComment");

                    b.Navigation("User");

                    b.Navigation("Video");
                });

            modelBuilder.Entity("ApiBasic.Domain.Search", b =>
                {
                    b.HasOne("ApiBasic.Domain.User", "User")
                        .WithMany("Searchs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_UserSearch");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApiBasic.Domain.TheLoaiAnime", b =>
                {
                    b.HasOne("ApiBasic.Domain.Anime", "Anime")
                        .WithMany("theLoaiAnimes")
                        .HasForeignKey("AnimeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_TheLoaiAnimeTheLoaiAnime");

                    b.HasOne("ApiBasic.Domain.TheLoai", "TheLoai")
                        .WithMany("theLoaiAnimes")
                        .HasForeignKey("TheLoaiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_TheLoaiAnimeTheLoai");

                    b.Navigation("Anime");

                    b.Navigation("TheLoai");
                });

            modelBuilder.Entity("ApiBasic.Domain.UserDisLikeVideo", b =>
                {
                    b.HasOne("ApiBasic.Domain.User", "User")
                        .WithMany("UserDisLikeVideos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ApiBasic.Domain.Video", "Video")
                        .WithMany("UserDisLikeVideos")
                        .HasForeignKey("VideoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Video");
                });

            modelBuilder.Entity("ApiBasic.Domain.UserDownloadVideo", b =>
                {
                    b.HasOne("ApiBasic.Domain.User", "User")
                        .WithMany("UserDownloadVideo")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ApiBasic.Domain.Video", "Video")
                        .WithMany("UserDownloadVideo")
                        .HasForeignKey("VideoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Video");
                });

            modelBuilder.Entity("ApiBasic.Domain.UserFollow", b =>
                {
                    b.HasOne("ApiBasic.Domain.User", "Follower")
                        .WithMany("Following")
                        .HasForeignKey("FollowerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ApiBasic.Domain.User", "Following")
                        .WithMany("Followers")
                        .HasForeignKey("FollowingId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Follower");

                    b.Navigation("Following");
                });

            modelBuilder.Entity("ApiBasic.Domain.UserLikeVideo", b =>
                {
                    b.HasOne("ApiBasic.Domain.User", "User")
                        .WithMany("UserLikeVideos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ApiBasic.Domain.Video", "Video")
                        .WithMany("UserLikeVideos")
                        .HasForeignKey("VideoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Video");
                });

            modelBuilder.Entity("ApiBasic.Domain.UserToken", b =>
                {
                    b.HasOne("ApiBasic.Domain.User", "user")
                        .WithMany("UserTokens")
                        .HasForeignKey("idUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("ApiBasic.Domain.UserXemVideo", b =>
                {
                    b.HasOne("ApiBasic.Domain.User", "User")
                        .WithMany("UserXemVideos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ApiBasic.Domain.Video", "Video")
                        .WithMany("UserXemVideos")
                        .HasForeignKey("VideoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Video");
                });

            modelBuilder.Entity("ApiBasic.Domain.Video", b =>
                {
                    b.HasOne("ApiBasic.Domain.Anime", "Anime")
                        .WithMany("videos")
                        .HasForeignKey("AnimeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Anime_Vides");

                    b.HasOne("ApiBasic.Domain.User", "User")
                        .WithMany("Videos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_UserUpVideo");

                    b.Navigation("Anime");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApiBasic.Domain.Anime", b =>
                {
                    b.Navigation("theLoaiAnimes");

                    b.Navigation("videos");
                });

            modelBuilder.Entity("ApiBasic.Domain.Comment", b =>
                {
                    b.Navigation("ChildComments");
                });

            modelBuilder.Entity("ApiBasic.Domain.TheLoai", b =>
                {
                    b.Navigation("theLoaiAnimes");
                });

            modelBuilder.Entity("ApiBasic.Domain.User", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Followers");

                    b.Navigation("Following");

                    b.Navigation("Searchs");

                    b.Navigation("UserDisLikeVideos");

                    b.Navigation("UserDownloadVideo");

                    b.Navigation("UserLikeVideos");

                    b.Navigation("UserTokens");

                    b.Navigation("UserXemVideos");

                    b.Navigation("Videos");
                });

            modelBuilder.Entity("ApiBasic.Domain.Video", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("UserDisLikeVideos");

                    b.Navigation("UserDownloadVideo");

                    b.Navigation("UserLikeVideos");

                    b.Navigation("UserXemVideos");
                });
#pragma warning restore 612, 618
        }
    }
}
