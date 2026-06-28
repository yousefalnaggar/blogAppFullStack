using BlogApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.API.Data;

public class BlogDbContext(DbContextOptions<BlogDbContext> options) : DbContext(options)
{
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
}
