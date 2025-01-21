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

const Wrapper = styled.div``;
const Container = styled.div``;
const Center = styled.div`
  max-width: 650px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
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
  const navigate = useNavigate();
  return (
    <Wrapper>
      <MenubarDefault />
      <MenubarSpacer />
      <Container>
        <Center>{getPage(pageNumber, setPageNumber, navigate)}</Center>
        {/* <Center>{addressWidget(pageNumber, setPageNumber)}</Center> */}
      </Container>
    </Wrapper>
  );
}

function BasicDetailsWidget(pageNumber, setPageNumber) {
  return (
    <>
      <Title>Getting Started</Title>
      <Flex>
        <SubTitle>Let's get you signed up</SubTitle>
      </Flex>
      <Form>
        <InputbarWithAnimatedPlaceholder placeholder="Email Address" />
        <InputbarWithAnimatedPlaceholder placeholder="Full Name" />
        <PhoneNumberInput placeholder="Phone" />
        <DateInput placeholder={"Date Of Birth"} />
        <FilledButton
          placeholder={"Continue"}
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        />
        <SignupTextBlock />
      </Form>
    </>
  );
}

function AddressWidget(pageNumber, setPageNumber) {
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
          items={["Nepal", "China", "India"]}
          label="Country"
          placeholder="Pick a country"
        />
        <CustomDropDown
          label="Province"
          placeholder="Pick a country"
          items={[
            "Province 1",
            "Mashsh Pradesh",
            "Bagmati",
            "Gandaki",
            "Lumbini",
            "Karnali",
            "Sudurpaschim",
          ]}
        />
        <CustomDropDown
          items={["Nepal", "China", "India"]}
          placeholder="Pick a city"
          label="City"
        />
        <FilledButton
          placeholder={"Continue"}
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        />
        <SignupTextBlock />
      </Form>
    </>
  );
}

function OtpWidget(pageNumber, setPageNumber) {
  return (
    <>
      <Flex>
        <BackButton
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        />
        <Title style={{ fontSize: "40px", marginLeft: "50px" }}>
          OTP Authentication
        </Title>
      </Flex>

      <SubTitle>
        An authentication code has been sent to
        <br />
        <b>youremail@gmail.com</b>
      </SubTitle>
      <Form style={{ height: "300px" }}>
        <OTPInput />
        <ResendOtpTextBlock />
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <FilledButton
            placeholder={"Continue"}
            onClick={() => {
              setPageNumber(pageNumber + 1);
            }}
          />
          <SignupTextBlock />
        </div>
      </Form>
    </>
  );
}

function PasswordWidget(pageNumber, setPageNumber) {
  return (
    <>
      <Flex>
        <BackButton
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        />
        <Title style={{ fontSize: "40px", marginLeft: "70px" }}>
          Create Password
        </Title>
      </Flex>

      <SubTitle>Password must be 8 - 12 characters long</SubTitle>
      <Form style={{ height: "300px" }}>
        <InputbarWithAnimatedPlaceholder
          type="password"
          placeholder="Password"
        />
        <InputbarWithAnimatedPlaceholder
          type="password"
          placeholder="Confirm password"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <FilledButton
            placeholder={"Continue"}
            onClick={() => {
              setPageNumber(pageNumber + 1);
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
        <>
          <InterestChip text="Mobile Development" />
        </>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <FilledButton
            placeholder={"Complete"}
            onClick={() => {
              navigate("/dashboard");
            }}
          />
          <SignupTextBlock />
        </div>
      </Form>
    </>
  );
}

function getPage(pageNumber, setPageNumber, navigate) {
  switch (pageNumber) {
    case 0:
      return BasicDetailsWidget(pageNumber, setPageNumber);
    case 1:
      return AddressWidget(pageNumber, setPageNumber);
    case 2:
      return OtpWidget(pageNumber, setPageNumber);
    case 3:
      return PasswordWidget(pageNumber, setPageNumber);
    case 4:
      return InterestsWidget(pageNumber, setPageNumber, navigate);
    default:
      return <>"Error"</>;
  }
}
export default SignupPage;
