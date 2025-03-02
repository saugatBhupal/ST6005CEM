import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1/";

jest.mock("axios");

describe("API Testing", () => {
  it("Should return user not found", async () => {
    axios.post.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.post(`${baseUrl}/auth/login`, {
      email: "neerakarsuwal106@gmail.com",
      password: "12345678",
    });

    expect(response.status).toEqual(404);
    expect(response.data.message).toEqual("Not Found");
  });
  it("Should get education", async () => {
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.get(
      `${baseUrl}/user/education/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(404);
  });
  it("Should get experience", async () => {
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.get(
      `${baseUrl}/user/experience/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(404);
  });
  it("Should get skills", async () => {
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.get(
      `${baseUrl}/user/skills/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(404);
  });
  it("Should get search history", async () => {
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.get(
      `${baseUrl}/user/search/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(404);
  });
  it("Should update search history", async () => {
    axios.post.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.post(
      `${baseUrl}/user/search/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(404);
  });
  it("Should get notification", async () => {
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.get(
      `${baseUrl}/user/notification/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(404);
  });
  it("Should get task", async () => {
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.get(
      `${baseUrl}/user/task/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(404);
  });
  it("Should get applied projects", async () => {
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.get(
      `${baseUrl}/user/projects/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(200);
  });
  it("Should get accepted projects", async () => {
    axios.get.mockResolvedValue({
      status: 404,
      data: { message: "Not Found" },
    });

    const response = await axios.get(
      `${baseUrl}/user/accepted-projects/67c421a24640ee8163c606fc`
    );

    expect(response.status).toEqual(200);
  });
});
