export const isPresent = () => {
  let data = localStorage.getItem("data");
  if (data == null) return false;
  else return true;
};

export const setContext = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export function deleteContext() {
  localStorage.removeItem("data");
}

export async function getContext() {
  if (isPresent) {
    // const data = await JSON.parse(localStorage.getItem("data"));
    // console.log(data)
    return await JSON.parse(localStorage.getItem("data"));
  } else {
    return false;
  }
}
