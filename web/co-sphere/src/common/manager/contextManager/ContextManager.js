export const isPresent = () => {
  let data = localStorage.getItem("data");
  if (data == null) return false;
  else return true;
};

export const setContext = async (data) => {
  await localStorage.setItem("data", JSON.stringify(data));
};

export const updateProfileImage = async (newImageUrl) => {
  console.log(newImageUrl);
  try {
    const storedData = await localStorage.getItem("data");
    if (!storedData) throw new Error("No data found in localStorage");

    const parsedData = JSON.parse(storedData);

    if (parsedData.user) {
      parsedData.user.profileImage = newImageUrl;

      await localStorage.setItem("data", JSON.stringify(parsedData));

      console.log("Profile image updated successfully");
      return parsedData;
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error("Error updating profile image:", error);
  }
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
