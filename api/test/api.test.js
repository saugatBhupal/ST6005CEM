const request = require("supertest");
const { app, server } = require("../config/socketConfig");

describe("API Testings", () => {
  it("GET /api/v1/project/ | should receive all projects", async () => {
    const response = await request(app).get("/api/v1/project");
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
  it("GET /api/v1/project/explore/ | should receive all explore projects", async () => {
    const response = await request(app).get(
      "/api/v1/project/explore/67b05057151bd4f0a904a0ba"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });

  it("GET /api/v1/project/ | should receive projects of the id", async () => {
    const response = await request(app).get(
      "/api/v1/project/67b833a9ae4563c72ac2f02d"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
  it("GET /api/v1/project/name | should receive all projects of that name", async () => {
    const response = await request(app).get("/api/v1/project/name/half");
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
  it("GET /api/v1/project/applied-projects/ | should receive all applied projects", async () => {
    const response = await request(app).get(
      "/api/v1/project/applied-projects/67b05057151bd4f0a904a0ba"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
  it("GET /api/v1/project/hiring/ | should receive all explore projects", async () => {
    const response = await request(app).get(
      "/api/v1/project/hiring/67b05057151bd4f0a904a0ba"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
  it("GET /api/v1/project/active/ | should receive all active projects", async () => {
    const response = await request(app).get(
      "/api/v1/project/active/67b05057151bd4f0a904a0ba"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
  it("GET /api/v1/project/complete/ | should receive all complete projects", async () => {
    const response = await request(app).get(
      "/api/v1/project/complete/67b05057151bd4f0a904a0ba"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
  it("POST /api/v1/project/complete/ | should receive the completed projects", async () => {
    const response = await request(app).post(
      "/api/v1/project/67bd65239bd4071ce11646d1/complete"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
  it("POST /api/v1/project/finish-hiring/ | should finish hiring process of the project", async () => {
    const response = await request(app).post(
      "/api/v1/project/finish-hiring/67b83064af55b52f8d7b4580"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
});
