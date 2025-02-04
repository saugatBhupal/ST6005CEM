export const isPresent = () => {
  let data = localStorage.getItem("data");
  if (data == null) return false;
  else return true;
};

export const setContext = async (data) => {
  await localStorage.setItem("data", JSON.stringify(data));
};

export function deleteContext() {
  localStorage.removeItem("data");
}

export async function getContext() {
  if (isPresent) {
    const data = await JSON.parse(localStorage.getItem("data"));
    return data;
  } else {
    return false;
  }
}
