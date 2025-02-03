import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FilledButton from "../../components/buttons/FilledButton";
import InputbarWithAnimatedPlaceholder from "../../components/input/InputbarWithAnimatedPlaceholder";
import MenubarDefault from "../../components/menubar/MenubarDefault";
import MenubarSpacer from "../../components/spacer/MenubarSpacer";
import SigninTextBlock from "../../components/textBlocks/SigninTextBlock";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import { manageUserLogin } from "./manager/SigninManager";

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
  span {
    color: ${Colors.mainBlue};
    font-weight: 500;
    font-size: 30px;
  }
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
const Form = styled.form`
  width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-evenly;
  button {
    margin-top: 20px;
    width: 400px;
  }
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
function SigninPage() {
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
          <>
            <Title>
              Hello, <span></span>
            </Title>
            <Flex>
              <SubTitle>Sign in to your account</SubTitle>
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
                placeholder="Password"
                type="password"
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

              <FilledButton
                placeholder={"Sign in"}
                onClick={async () => {
                  if (validationForm.email && validationForm.password) {
                    setIsValid(true);
                    await manageUserLogin(
                      formData,
                      () => {
                        navigate("/dashboard");
                        setError(null);
                      },
                      (message) => {
                        setError(message);
                      }
                    );
                  } else {
                    setIsValid(false);
                    setError(null);
                  }
                }}
              />
              <SigninTextBlock />
            </Form>
          </>
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

export default SigninPage;
