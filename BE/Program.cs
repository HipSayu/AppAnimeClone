using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ApiBasic.ApplicationServices.LoginModule.Abstract;
using ApiBasic.ApplicationServices.LoginModule.implements;
using ApiBasic.ApplicationServices.ModuleFile.Abstract;
using ApiBasic.ApplicationServices.ModuleFile.Implements;
using ApiBasic.ApplicationServices.UserDisLikeVideoModule.Abstract;
using ApiBasic.ApplicationServices.UserDisLikeVideoModule.Implements;
using ApiBasic.ApplicationServices.UserDownloadVideoModule.Abstract;
using ApiBasic.ApplicationServices.UserLikeModule.Abstract;
using ApiBasic.ApplicationServices.UserLikeVideoModule.Implements;
using ApiBasic.ApplicationServices.UserModule.Abstract;
using ApiBasic.ApplicationServices.UserModule.Implements;
using ApiBasic.ApplicationServices.UserXemVideoModule.Abstract;
using ApiBasic.ApplicationServices.UserXemVideoModule.Implements;
using ApiBasic.ApplicationServices.VideoModule.Abstract;
using ApiBasic.ApplicationServices.VideoModule.Implements;
using ApiBasic.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var apiCorsPolicy = "ApiCorsPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: apiCorsPolicy,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .WithMethods("OPTIONS", "GET");
                      });
});

// Add services to the container.
builder.Services.AddDbContext<AnimeAppContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyDB"));
});

// Cấu hình JWT
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidAudience = builder.Configuration["JWT:ValidAudience"],
            ValidateAudience = true,
            ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
            ValidateIssuer = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])
            ),
            ClockSkew = TimeSpan.Zero
        };
        options.RequireHttpsMetadata = false;
    });

// cấu hình httpContext
builder.Services.AddHttpContextAccessor();

// Cấu hình authorize ở swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Version = "v1", Title = "Web API" });
    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Description =
                "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            Name = "Authorization",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey
        }
    );

    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] { }
            }
        }
    );
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Add Scoped ở đây
builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IManageImageServices, ManageImageServices>();
builder.Services.AddScoped<IVideoServices, VideoServices>();
builder.Services.AddScoped<IUserDislikeVideoService, UserDislikeVideoService>();
builder.Services.AddScoped<IUserDownloadVideoService, UserDownloadVideoService>();
builder.Services.AddScoped<IUserLikeVideoService, UserLikeVideoService>();
builder.Services.AddScoped<IUserXemVideoService, UserXemVideoService>();
builder.Services.AddScoped<ILoginServices, LoginServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors(apiCorsPolicy);

app.UseAuthorization();
app.MapControllers();

app.Run();
