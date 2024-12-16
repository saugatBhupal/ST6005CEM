import React from 'react'
import styled from 'styled-components'
import MenubarDefault from '../components/menubar/MenubarDefault'
import { Colors } from '../constants/Colors'
import MenubarSpacer from '../components/spacer/MenubarSpacer'
import OutlinedButton from '../components/buttons/OutlinedButton'
import FilledButton from '../components/buttons/FilledButton'

const Wrapper = styled.div`
`
const Container = styled.div`
    position : relative;
    display : flex;
    flex-direction : column;
    justify-content : space-between;
`
const Center = styled.div`
    max-width : 650px;
    margin : auto;
    margin-top : 20px;
    text-align : center;
`
const Title = styled.div`
    color : ${Colors.justBlack};
    font-weight : 500;
    font-size : 70px;
`
const SubTitle = styled.div`
    color : ${Colors.subtitleBlack};
    font-weight : 400;
    font-size : 16px;
    margin : 20px auto;
`
const Buttons = styled.div`
    display : flex;
    width : fit-content;
    margin : 30px auto;
    button{
        width : 150px;
        margin : auto 10px;
    }
`
const Bottom = styled.div`
    width : 100%;
    position : fixed;
    bottom : 0px;
    display : flex;
    justify-content : space-evenly;
`
const Rectangle = styled.div`
    height : 450px;
    width : 320px;
    bottom : 0px;
    background-color : red;
`
function Homepage() {
  return (
    <Wrapper>
        <MenubarDefault/>
        <MenubarSpacer/>
        <Container>
            <Center>
                <Title>
                    Connecting talents with projects
                </Title>
                <SubTitle>We make it easy to find your dream job - regardless of your location<br/> Browse over 100,000 jobs from top companies to fast-growing startups</SubTitle>
                <Buttons>
                    <OutlinedButton placeholder = "Find a job" onClick = {()=>{}}/>
                    <FilledButton placeholder = "Find a job" onClick = {()=>{}}/>
                </Buttons>
            </Center>
            <Bottom>
                <Rectangle>

                </Rectangle>
                <Rectangle>

                </Rectangle>
                <Rectangle>

                </Rectangle>
                <Rectangle>

                </Rectangle>
            </Bottom>
        </Container>
    </Wrapper>
  )
}

export default Homepage