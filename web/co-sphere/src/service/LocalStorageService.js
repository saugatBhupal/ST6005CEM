import { getContext } from "../common/manager/contextManager/ContextManager";

export async function getUserIdFromLocalStorage() {
  const localContext = await getContext();
  return localContext.user._id;
}
