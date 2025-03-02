import React, { useState } from "react";
import styled from "styled-components";
import ProfileImage from "../../../assets/images/icon/profile_icon/profile_icon.png";
import { useToast } from "../../../common/manager/contextManager/ToastContextManager";
import { manageUploadProfileImage } from "../../../common/manager/userManager/UserManager";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { updateLocalProfileImage } from "../../../service/LocalStorageService";
import EditIcon from "../../icon/EditIcon";

const Wrapper = styled.div`
  img {
    border-radius: 50%;
    object-fit: cover;
  }
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  border-radius: 50%;
  top: 0;
  background-color: ${Colors.overlayGrey};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UpdateProfileImage = styled.label`
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: ${Colors.mainBlue};
  &:hover {
    background-color: ${Colors.strokeBlue};
  }
  span {
    font-size: ${FontSize.small};
    color: ${Colors.justWhite} !important;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

function UpdateProfileImageWidget({ url, height, userId }) {
  const [image, setImage] = useState(url || ProfileImage);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { showToast } = useToast();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      showToast("Uploading new image...");

      reader.onloadend = async () => {
        setImage(reader.result);
        setUploadedImage(file);
        await handleSubmit(file); // Ensure file is passed to handleSubmit
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Only .jpg and .png files are allowed!");
    }
  };

  async function handleSubmit(file) {
    if (!file) {
      showToast("Could not upload file. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("userID", userId);
    formData.append("media", file);

    try {
      await manageUploadProfileImage(
        formData,
        async () => {
          showToast("Profile image updated.");
          await updateLocalProfileImage();
        },
        (err) => showToast(err)
      );
    } catch (error) {
      showToast("An error occurred during upload.");
    }
  }

  return (
    <Wrapper>
      <img
        src={image}
        height={height || "40px"}
        width={height || "40px"}
        alt="Profile"
      />
      <Absolute
        style={{
          height: height || "40px",
          width: height || "40px",
        }}
      >
        <UpdateProfileImage htmlFor="file-upload">
          <EditIcon color={Colors.justWhite} />
          <span>Update Image</span>
        </UpdateProfileImage>
        <HiddenInput
          type="file"
          id="file-upload"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
      </Absolute>
    </Wrapper>
  );
}

export default UpdateProfileImageWidget;
