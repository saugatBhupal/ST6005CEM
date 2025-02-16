import {
  getContext,
  isPresent,
} from "../common/manager/contextManager/ContextManager";

export async function getToken() {
  if (isPresent) {
    const data = await getContext();
    return (await data) && data.token;
  } else {
    return null;
  }
}
