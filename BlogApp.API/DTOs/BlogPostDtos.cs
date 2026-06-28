using System.ComponentModel.DataAnnotations;

namespace BlogApp.API.DTOs;

public record BlogPostResponse(int Id, string Title, string Content, string Author, DateTime CreatedAt, DateTime UpdatedAt);

public record CreateBlogPostRequest(
    [Required, MinLength(1), MaxLength(200)] string Title,
    [Required, MinLength(1)] string Content,
    [Required, MinLength(1), MaxLength(100)] string Author);

public record UpdateBlogPostRequest(
    [Required, MinLength(1), MaxLength(200)] string Title,
    [Required, MinLength(1)] string Content,
    [Required, MinLength(1), MaxLength(100)] string Author);
