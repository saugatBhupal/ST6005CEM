import { setContext } from "../../../common/manager/contextManager/ContextManager";
import { loginService } from "../../../service/AuthService";

export async function manageUserLogin(data, onSuccess, onFailure) {
  data = { email: data.email, password: data.password };
  try {
    await loginService(data, async (response) => {
      if (response.status === 200) {
        await setContext(response.data.data);
        onSuccess();
        window.location.reload();
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}
