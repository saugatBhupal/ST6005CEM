import {
  createPasswordService,
  registerService,
  verifyOtpService,
} from "../../../service/AuthService";

export async function manageUserRegistration(data, onSuccess, onFailure) {
  try {
    await registerService(data, (response) => {
      if (response.status === 200) {
        onSuccess();
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}
export async function manageOtpVerification(data, onSuccess, onFailure) {
  data = { type: "verifyUser", email: data.email, otp: data.otp };
  try {
    await verifyOtpService(data, (response) => {
      if (response.status === 200) {
        onSuccess();
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}
export async function manageCreatePassword(data, onSuccess, onFailure) {
  data = { email: data.email, password: data.password };
  try {
    await createPasswordService(data, (response) => {
      if (response.status === 200) {
        onSuccess();
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}
