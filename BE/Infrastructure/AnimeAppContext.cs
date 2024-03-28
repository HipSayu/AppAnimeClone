using ApiBasic.Domain;
using Microsoft.EntityFrameworkCore;

namespace ApiBasic.Infrastructure
{
    public class AnimeAppContext : DbContext
    {
        public AnimeAppContext(DbContextOptions options)
            : base(options) { }

        #region

        public DbSet<Anime> Animes { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Search> Searchs { get; set; }

        public DbSet<TheLoai> TheLoais { get; set; }
        public DbSet<TheLoaiAnime> TheLoaiAnimes { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserDisLikeVideo> UserDisLikeVideos { get; set; }

        public DbSet<UserDownloadVideo> UserDownloadVideos { get; set; }

        public DbSet<UserLikeVideo> UserLikeVideos { get; set; }

        public DbSet<UserFollow> UserFollows { get; set; }

        public DbSet<UserXemVideo> UserXemVideos { get; set; }

        public DbSet<Video> Videos { get; set; }

        #endregion
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Anime
            modelBuilder.Entity<Anime>(entity =>
            {
                entity.ToTable("Anime");
                entity.HasKey(a => a.Id);
                entity.HasIndex(a => new
                {
                    a.Id,
                    a.NameAnime,
                    a.Age
                });
            });
            //Comments
            modelBuilder
                .Entity<Comment>()
                .HasOne(c => c.Video)
                .WithMany(v => v.Comments)
                .HasForeignKey(c => c.VideoId)
                .HasConstraintName("FK_Comment_Video")
                .OnDelete(DeleteBehavior.Restrict); // Xóa các comment liên quan khi video bị xóa

            modelBuilder
                .Entity<Comment>()
                .HasOne(c => c.ParentComment)
                .WithMany(pc => pc.ChildComments)
                .HasForeignKey(c => c.ParentCommentId)
                .HasConstraintName("FK_Comment_Comment")
                .OnDelete(DeleteBehavior.Restrict); // Không cho phép xóa comment cha khi có comment con tồn tại

            modelBuilder
                .Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .HasConstraintName("FK_Comment_User")
                .OnDelete(DeleteBehavior.Restrict); // Xóa các comment liên quan khi user bị xóa

            //Search
            modelBuilder.Entity<Search>(entity =>
            {
                entity.ToTable("Search");
                entity.HasKey(s => s.Id);
                entity.HasIndex(s => s.SearchKeyWord);
                entity
                    .HasOne(s => s.User)
                    .WithMany(s => s.Searchs)
                    .HasForeignKey(s => s.UserId)
                    .HasConstraintName("FK_UserSearch");
            });
            //TheLoai
            modelBuilder.Entity<TheLoai>(entity =>
            {
                entity.ToTable("TheLoai");
                entity.HasKey(s => s.Id);
                entity.HasIndex(s => s.TenTheLoai);
            });
            //TheLoaiAnime
            modelBuilder.Entity<TheLoaiAnime>(entity =>
            {
                entity.ToTable("TheLoaiAnime");
                entity.HasKey(s => s.Id);
                entity
                    .HasOne(s => s.TheLoai)
                    .WithMany(s => s.theLoaiAnimes)
                    .HasForeignKey(s => s.TheLoaiId)
                    .HasConstraintName("FK_TheLoaiAnimeTheLoai");
                entity
                    .HasOne(s => s.Anime)
                    .WithMany(s => s.theLoaiAnimes)
                    .HasForeignKey(s => s.AnimeId)
                    .HasConstraintName("FK_TheLoaiAnimeTheLoaiAnime");
            });
            //User
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => new
                {
                    u.Id,
                    u.UserName,
                    u.SĐT
                });

                entity.HasIndex(u => u.SĐT).IsUnique();
            });

            //UserFollow
            modelBuilder.Entity<UserFollow>(entity =>
            {
                entity.ToTable("UserFollow");
                entity.HasKey(u => u.Id);
            });
            modelBuilder
                .Entity<UserFollow>()
                .HasOne(uf => uf.Follower)
                .WithMany(u => u.Following)
                .HasForeignKey(uf => uf.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder
                .Entity<UserFollow>()
                .HasOne(uf => uf.Following)
                .WithMany(u => u.Followers)
                .HasForeignKey(uf => uf.FollowingId)
                .OnDelete(DeleteBehavior.Restrict);

            //UserDislikeVideo
            modelBuilder.Entity<UserDisLikeVideo>(entity =>
            {
                entity.ToTable("UserDisLikeVideo");
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => new { u.UserId, u.VideoId });
                entity
                    .HasOne(u => u.User)
                    .WithMany(u => u.UserDisLikeVideos)
                    .HasForeignKey(u => u.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity
                    .HasOne(u => u.Video)
                    .WithMany(u => u.UserDisLikeVideos)
                    .HasForeignKey(u => u.VideoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            //UserDownloadlikeVideo
            modelBuilder.Entity<UserDownloadVideo>(entity =>
            {
                entity.ToTable("UserDownloadVideo");
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => new { u.UserId, u.VideoId });
                entity
                    .HasOne(u => u.User)
                    .WithMany(u => u.UserDownloadVideo)
                    .HasForeignKey(u => u.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity
                    .HasOne(u => u.Video)
                    .WithMany(u => u.UserDownloadVideo)
                    .HasForeignKey(u => u.VideoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            //UserlikeVideo
            modelBuilder.Entity<UserLikeVideo>(entity =>
            {
                entity.ToTable("UserLikeVideo");
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => new { u.UserId, u.VideoId });
                entity
                    .HasOne(u => u.User)
                    .WithMany(u => u.UserLikeVideos)
                    .HasForeignKey(u => u.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity
                    .HasOne(u => u.Video)
                    .WithMany(u => u.UserLikeVideos)
                    .HasForeignKey(u => u.VideoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            //UserXemVideo
            modelBuilder.Entity<UserXemVideo>(entity =>
            {
                entity.ToTable("UserXemVideo");
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => new { u.UserId, u.VideoId });
                entity
                    .HasOne(u => u.User)
                    .WithMany(u => u.UserXemVideos)
                    .HasForeignKey(u => u.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity
                    .HasOne(u => u.Video)
                    .WithMany(u => u.UserXemVideos)
                    .HasForeignKey(u => u.VideoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Video>(entity =>
            {
                entity.ToTable("Video");
                entity.HasKey(v => v.Id);
                entity.HasIndex(v => new
                {
                    v.Id,
                    v.NameVideos,
                    v.Time
                });
                entity
                    .HasOne(v => v.User)
                    .WithMany(v => v.Videos)
                    .HasForeignKey(v => v.UserId)
                    .HasConstraintName("FK_UserUpVideo");
                entity
                    .HasOne(v => v.Anime)
                    .WithMany(v => v.videos)
                    .HasForeignKey(v => v.AnimeId)
                    .HasConstraintName("FK_Anime_Vides");
            });
        }
    }
}
