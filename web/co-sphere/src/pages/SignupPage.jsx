import React from 'react'
import styled from 'styled-components'
import MenubarDefault from '../components/menubar/MenubarDefault'
import MenubarSpacer from '../components/spacer/MenubarSpacer'
import { Colors } from '../constants/Colors'
import InputbarWithAnimatedPlaceholder from '../components/input/InputbarWithAnimatedPlaceholder'
import PhoneNumberInput from '../components/input/PhoneNumberInput'
import DateOfBirthInput from '../components/input/DateOfBirthInput'
import FilledButton from '../components/buttons/FilledButton'

const Wrapper = styled.div``
const Container = styled.div``
const Center = styled.div`
    max-width : 650px; 
    margin : auto;
    margin-top : 20px;
    text-align : center;
`
const Title = styled.div`
    color : ${Colors.mainBlue};
    font-weight : 500;
    font-size : 70px;
`
const SubTitle = styled.div`
    color : ${Colors.subtitleBlack};
    font-weight : 400;
    font-size : 16px;
    margin : 20px auto;
`
const Form = styled.div`
    width : 400px;
    margin : auto;
    display : flex;
    flex-direction : column;
    height : 450px;
    justify-content : space-evenly;
    button{
        margin-top : 40px;
        width : 400px;
    }
`
function SignupPage() {
  return (
    <Wrapper>
        <MenubarDefault/>
        <MenubarSpacer/>
        <Container>
        <Center>
                <Title>
                    Getting Started
                </Title>
                <SubTitle>
                    Let's get you signed up
                </SubTitle>
                <Form>
                    <InputbarWithAnimatedPlaceholder placeholder = "Email Address"/>
                    <InputbarWithAnimatedPlaceholder placeholder = "Full Name"/>
                    <PhoneNumberInput placeholder = "Phone"/>
                    <DateOfBirthInput placeholder={"Date Of Birth"}/>
                    <FilledButton placeholder={"Continue"} onClick={()=>{}}/>
                </Form>
            </Center>
        </Container>
    </Wrapper>
  )
}

export default SignupPage