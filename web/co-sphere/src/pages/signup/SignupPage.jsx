import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/buttons/BackButton";
import FilledButton from "../../components/buttons/FilledButton";
import InterestChip from "../../components/input/chip/InterestChip";
import DateInput from "../../components/input/DateInput";
import CustomDropDown from "../../components/input/dropdown/CustomDropDown";
import InputbarWithAnimatedPlaceholder from "../../components/input/InputbarWithAnimatedPlaceholder";
import OTPInput from "../../components/input/otp/OtpInputBoxes";
import PhoneNumberInput from "../../components/input/PhoneNumberInput";
import MenubarDefault from "../../components/menubar/MenubarDefault";
import MenubarSpacer from "../../components/spacer/MenubarSpacer";
import ResendOtpTextBlock from "../../components/textBlocks/ResendOtpTextBlock";
import SignupTextBlock from "../../components/textBlocks/SignupTextBlock";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import {
  getAllCountries,
  getStatesOfCountry,
} from "../../utils/address/AddressUtils";
import {
  manageCreatePassword,
  manageOtpVerification,
  manageUserRegistration,
} from "./manager/SignupManager";

const Wrapper = styled.div``;
const Container = styled.div``;
const Center = styled.div`
  max-width: 650px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  span {
    font-size: ${FontSize.extraSmall};
    color: ${Colors.errorRed};
  }
`;
const Title = styled.div`
  color: ${Colors.mainBlue};
  font-weight: 500;
  font-size: 70px;
`;
const SubTitle = styled.div`
  color: ${Colors.subtitleBlack};
  font-weight: 400;
  font-size: 16px;
  margin: 20px auto;
  text-align: center;
  b {
    font-size: 18px;
    color: black;
  }
`;
const Form = styled.div`
  width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-evenly;
  button {
    margin-top: 20px;
    width: 400px;
  }
`;
const Interests = styled.div`
  width: 500px;
  align-items: center;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
`;
const Flex = styled.div`
  width: 500px;
  margin: auto;
  display: flex;
  align-items: center;
  button {
    margin-right: -25px;
  }
`;
function SignupPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [validationForm, setValidationForm] = useState({
    email: false,
    fullname: false,
    phone: false,
    dob: false,
    country: false,
    province: false,
    city: false,
    password: null,
    confirmPassword: null,
  });
  const [formData, setFormData] = useState({
    email: null,
    fullname: null,
    phone: null,
    dob: null,
    country: null,
    province: null,
    city: null,
    otp: null,
    password: null,
    confirmPassword: null,
    interests: [],
  });
  const updateFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const updateValidationFormData = (field, value) => {
    setValidationForm((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <Wrapper>
      <MenubarDefault />
      <MenubarSpacer />
      <Container>
        <Center>
          {getPage(
            pageNumber,
            setPageNumber,
            navigate,
            updateFormData,
            formData,
            updateValidationFormData,
            validationForm,
            setIsValid,
            setError
          )}
          <span>
            {!isValid && "Please check if the form has been filled correctly."}
            {error && error}
          </span>
        </Center>
        {/* <Center>{addressWidget(pageNumber, setPageNumber)}</Center> */}
      </Container>
    </Wrapper>
  );
}

function BasicDetailsWidget(
  pageNumber,
  setPageNumber,
  updateFormData,
  formData,
  updateValidationFormData,
  validationForm,
  setIsValid
) {
  return (
    <>
      <Title>Getting Started</Title>
      <Flex>
        <SubTitle>Let's get you signed up</SubTitle>
      </Flex>
      <Form>
        <InputbarWithAnimatedPlaceholder
          placeholder="Email Address"
          validationType="email"
          value={formData.email ? formData.email : null}
          onChange={(value) => {
            updateFormData("email", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("email", true)
              : updateValidationFormData("email", false);
          }}
        />
        <InputbarWithAnimatedPlaceholder
          placeholder="Full Name"
          validationType="fullname"
          value={formData.fullname ? formData.fullname : null}
          onChange={(value) => {
            updateFormData("fullname", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("fullname", true)
              : updateValidationFormData("fullname", false);
          }}
        />
        <PhoneNumberInput
          placeholder="Phone"
          validationType={"phone"}
          value={formData.phone ? formData.phone : null}
          onChange={(value) => {
            updateFormData("phone", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("phone", true)
              : updateValidationFormData("phone", false);
          }}
        />
        <DateInput
          placeholder={"Date Of Birth"}
          validationType={"dob"}
          value={formData.dob ? formData.dob : null}
          onChange={(value) => {
            updateFormData("dob", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("dob", true)
              : updateValidationFormData("dob", false);
          }}
        />

        <FilledButton
          placeholder={"Continue"}
          onClick={() => {
            validationForm.email &
            validationForm.dob &
            validationForm.fullname &
            validationForm.phone
              ? (() => {
                  setPageNumber(pageNumber + 1);
                  setIsValid(true);
                })()
              : (() => {
                  setPageNumber(pageNumber + 1);
                  setIsValid(false);
                })();
          }}
        />
        <SignupTextBlock />
      </Form>
    </>
  );
}

function AddressWidget(
  pageNumber,
  setPageNumber,
  updateFormData,
  formData,
  updateValidationFormData,
  validationForm,
  setIsValid,
  setError
) {
  return (
    <>
      <Flex>
        <BackButton
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        />
        <Title>Country of residence</Title>
      </Flex>

      <SubTitle>
        Sharing your location ensures job opportunities are <br />
        focued on your area.
      </SubTitle>
      <Form>
        <CustomDropDown
          items={getAllCountries()}
          label="Country"
          placeholder="Pick a country"
          onChange={(value) => {
            updateFormData("country", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("country", true)
              : updateValidationFormData("country", false);
          }}
          value={formData.country}
        />
        <CustomDropDown
          label="Province/State"
          placeholder="Pick a province or state"
          items={formData.country && getStatesOfCountry(formData.country)}
          onChange={(value) => {
            updateFormData("province", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("province", true)
              : updateValidationFormData("province", false);
          }}
          value={formData.province}
        />
        <InputbarWithAnimatedPlaceholder
          placeholder="City"
          validationType="fullname"
          value={formData.city ? formData.city : null}
          onChange={(value) => {
            updateFormData("city", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("city", true)
              : updateValidationFormData("city", false);
          }}
        />

        <FilledButton
          placeholder={"Continue"}
          onClick={async () => {
            if (
              validationForm.country &&
              validationForm.province &&
              validationForm.city
            ) {
              setIsValid(true);
              await manageUserRegistration(
                formData,
                () => {
                  setPageNumber(pageNumber + 1);
                  setError(null);
                },
                (message) => {
                  setError(message);
                }
              );
            } else {
              setPageNumber(pageNumber);
              setIsValid(false);
              setError(null);
            }
          }}
        />
        <SignupTextBlock />
      </Form>
    </>
  );
}

function OtpWidget(
  pageNumber,
  setPageNumber,
  updateFormData,
  formData,
  updateValidationFormData,
  validationForm,
  setIsValid,
  setError
) {
  return (
    <>
      <Flex>
        {/* <BackButton
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        /> */}
        <Title style={{ fontSize: "40px", marginLeft: "50px" }}>
          OTP Authentication
        </Title>
      </Flex>

      <SubTitle>
        An authentication code has been sent to
        <br />
        <b>{formData.email}</b>
      </SubTitle>
      <Form style={{ height: "300px" }}>
        <OTPInput
          onChange={(value) => {
            updateFormData("otp", value);
          }}
        />
        <ResendOtpTextBlock
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <FilledButton
            placeholder={"Continue"}
            onClick={async () => {
              if (formData.otp && formData.otp.length > 5) {
                setIsValid(true);
                await manageOtpVerification(
                  formData,
                  () => {
                    setPageNumber(pageNumber + 1);
                    setError(null);
                  },
                  (message) => {
                    setError(message);
                  }
                );
              } else {
                setPageNumber(pageNumber);
                setIsValid(false);
                setError(null);
              }
            }}
          />
          <SignupTextBlock />
        </div>
      </Form>
    </>
  );
}

function PasswordWidget(
  pageNumber,
  setPageNumber,
  updateFormData,
  formData,
  updateValidationFormData,
  validationForm,
  setIsValid,
  setError
) {
  return (
    <>
      <Flex>
        {/* <BackButton
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        /> */}
        <Title style={{ fontSize: "40px", marginLeft: "70px" }}>
          Create Password
        </Title>
      </Flex>

      <SubTitle>Password must be 8 - 12 characters long</SubTitle>
      <Form style={{ height: "300px" }}>
        <InputbarWithAnimatedPlaceholder
          type="password"
          placeholder="Password"
          validationType="password"
          value={formData.password ? formData.password : null}
          onChange={(value) => {
            updateFormData("password", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("password", true)
              : updateValidationFormData("password", false);
          }}
        />
        <InputbarWithAnimatedPlaceholder
          type="password"
          placeholder="Confirm password"
          validationType="password"
          value={formData.confirmPassword ? formData.confirmPassword : null}
          onChange={(value) => {
            updateFormData("confirmPassword", value);
          }}
          isValid={(value) => {
            value
              ? updateValidationFormData("confirmPassword", true)
              : updateValidationFormData("confirmPassword", false);
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <FilledButton
            placeholder={"Continue"}
            onClick={async () => {
              if (validationForm.password && validationForm.confirmPassword) {
                if (formData.password === formData.confirmPassword) {
                  setIsValid(true);
                  await manageCreatePassword(
                    formData,
                    () => {
                      setPageNumber(pageNumber + 1);
                      setError(null);
                    },
                    (message) => {
                      setError(message);
                    }
                  );
                } else {
                  setError("Passwords do not match");
                }
              } else {
                setPageNumber(pageNumber);
                setIsValid(false);
                setError(null);
              }
            }}
          />
          <SignupTextBlock />
        </div>
      </Form>
    </>
  );
}

function InterestsWidget(pageNumber, setPageNumber, navigate) {
  return (
    <>
      <Flex>
        <BackButton
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        />
        <Title style={{ fontSize: "40px", marginLeft: "90px" }}>
          Your Interests
        </Title>
      </Flex>

      <SubTitle>
        Help us know you better by picking any 4 of the topics below
      </SubTitle>
      <Form>
        <Interests>
          <InterestChip text="Mobile Development" />
          <InterestChip text="Web Development" />
          <InterestChip text="Photography" />
          <InterestChip text="React JS" />
          <InterestChip text="Node JS" />
          <InterestChip text="Flutter" />
          <InterestChip text="Video Editing" />
          <InterestChip text="Content Writing" />
        </Interests>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <FilledButton
            placeholder={"Complete"}
            onClick={() => {
              navigate("/signin");
            }}
          />
          <SignupTextBlock />
        </div>
      </Form>
    </>
  );
}

function getPage(
  pageNumber,
  setPageNumber,
  navigate,
  updateFormData,
  formData,
  updateValidationFormData,
  validationForm,
  setIsValid,
  setError
) {
  switch (pageNumber) {
    case 0:
      return BasicDetailsWidget(
        pageNumber,
        setPageNumber,
        updateFormData,
        formData,
        updateValidationFormData,
        validationForm,
        setIsValid
      );
    case 1:
      return AddressWidget(
        pageNumber,
        setPageNumber,
        updateFormData,
        formData,
        updateValidationFormData,
        validationForm,
        setIsValid,
        setError
      );
    case 2:
      return OtpWidget(
        pageNumber,
        setPageNumber,
        updateFormData,
        formData,
        updateValidationFormData,
        validationForm,
        setIsValid,
        setError
      );
    case 3:
      return PasswordWidget(
        pageNumber,
        setPageNumber,
        updateFormData,
        formData,
        updateValidationFormData,
        validationForm,
        setIsValid,
        setError
      );
    case 4:
      return InterestsWidget(
        pageNumber,
        setPageNumber,
        navigate,
        updateFormData
      );
    default:
      return <>"Error"</>;
  }
}
export default SignupPage;
