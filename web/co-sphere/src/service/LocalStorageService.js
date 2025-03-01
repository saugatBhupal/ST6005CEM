import { getContext } from "../common/manager/contextManager/ContextManager";

export async function getUserIdFromLocalStorage() {
  const localContext = await getContext();
  return localContext ? localContext.user._id : null;
}

export async function getUserFromLocalStorage() {
  const localContext = await getContext();
  return localContext ? localContext.user : null;
}
