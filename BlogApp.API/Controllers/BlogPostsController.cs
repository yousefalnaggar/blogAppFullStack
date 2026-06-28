using BlogApp.API.Data;
using BlogApp.API.DTOs;
using BlogApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostsController(BlogDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<BlogPostResponse>> GetAll() =>
        await db.BlogPosts
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new BlogPostResponse(p.Id, p.Title, p.Content, p.Author, p.CreatedAt, p.UpdatedAt))
            .ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<BlogPostResponse>> GetById(int id)
    {
        var post = await db.BlogPosts.FindAsync(id);
        if (post is null) return NotFound();
        return new BlogPostResponse(post.Id, post.Title, post.Content, post.Author, post.CreatedAt, post.UpdatedAt);
    }

    [HttpPost]
    public async Task<ActionResult<BlogPostResponse>> Create(CreateBlogPostRequest request)
    {
        var post = new BlogPost
        {
            Title = request.Title,
            Content = request.Content,
            Author = request.Author,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.BlogPosts.Add(post);
        await db.SaveChangesAsync();
        var response = new BlogPostResponse(post.Id, post.Title, post.Content, post.Author, post.CreatedAt, post.UpdatedAt);
        return CreatedAtAction(nameof(GetById), new { id = post.Id }, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BlogPostResponse>> Update(int id, UpdateBlogPostRequest request)
    {
        var post = await db.BlogPosts.FindAsync(id);
        if (post is null) return NotFound();
        post.Title = request.Title;
        post.Content = request.Content;
        post.Author = request.Author;
        post.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return new BlogPostResponse(post.Id, post.Title, post.Content, post.Author, post.CreatedAt, post.UpdatedAt);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var post = await db.BlogPosts.FindAsync(id);
        if (post is null) return NotFound();
        db.BlogPosts.Remove(post);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
