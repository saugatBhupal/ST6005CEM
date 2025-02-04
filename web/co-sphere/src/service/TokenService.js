import {
  getContext,
  isPresent,
} from "../components/common/manager/contextManager/ContextManager";

export async function getToken() {
  if (isPresent) {
    const data = await getContext();
    console.log(data);
    return (await data) && data.jwt;
  } else {
    return null;
  }
}
