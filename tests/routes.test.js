const request = require("supertest");
const app = require("../server");

describe("Post Endpoints", () => {
  it("Should create a new post", async () => {
    const response = await request(app).post("/api/posts").send({
      userId: 1,
      title: "Test post created by Jane Doe",
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("post");
  });

  it("Should fetch a single post", async () => {
    const postId = 1;
    const response = await request(app).get(`/api/posts/${postId}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("post");
  });

  it("Should fetch all posts", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("posts");
    expect(response.body.posts).toHaveLength(1);
  });

  it("Should update a post", async () => {
    const response = await request(app).patch("/api/posts/1").send({
      userId: 1,
      title: "updated title",
      content: "Lorem ipsum",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("post");
    expect(response.body.post).toHaveProperty("title", "updated title");
  });

  it("Should return status code 500 if db constraint is violated", async () => {
    const response = await request(app).post("/api/posts").send({
      title: "test is cool",
      content: "Lorem ipsum",
    });
    expect(response.statusCode).toEqual(500);
    expect(response.body).toHaveProperty("error");
  });

  it("Should delete a post", async () => {
    const response = await request(app).delete("/api/posts/1");
    expect(response.statusCode).toEqual(204);
  });

  it("Should respond with status code 404 if resource is not found", async () => {
    const postId = 1;
    const response = await request(app).get(`/api/posts/${postId}`);
    expect(response.statusCode).toEqual(404);
  });
});
