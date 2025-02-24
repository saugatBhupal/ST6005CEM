import request from "../config/apiConfig/Request";

export async function registerService(details, callback) {
  await request
    .post("/auth/register", details, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

export async function verifyOtpService(details, callback) {
  await request
    .post("/auth/verify-otp", details, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

export async function createPasswordService(details, callback) {
  await request
    .post("/auth/create-password", details, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

export async function loginService(details, callback) {
  await request
    .post("/auth/login", details, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

