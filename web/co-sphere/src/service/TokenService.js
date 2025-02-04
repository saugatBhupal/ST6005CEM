import {
  getContext,
  isPresent,
} from "../components/common/manager/contextManager/ContextManager";

export async function getToken() {
  if (isPresent) {
    const data = await getContext();
    console.log(data.token);
    return (await data) && data.token;
  } else {
    return null;
  }
}
