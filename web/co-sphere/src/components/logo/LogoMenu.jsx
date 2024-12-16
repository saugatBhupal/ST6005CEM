import React from 'react'
import styled from 'styled-components'
import LogoImage from '../../assets/images/logo/logo.svg'
import { Colors } from '../../constants/Colors'

const Wrapper = styled.div``
const Container = styled.div`
    display : flex;
    align-items : center;
    width : 200px;
    justify-content : space-between;
`
const LogoImg = styled.div`
    background-color : transparent;
`
const LogoText = styled.div`
    color : ${Colors.mainBlue};
    font-size : 24px;
    font-weight : 500;
`
function LogoMenu() {
  return (
    <Wrapper>
        <Container> 
            <LogoImg>
                <img src={LogoImage} alt="logo" />
            </LogoImg>
            <LogoText>
                Co-Sphere
            </LogoText>
        </Container>
    </Wrapper>
  )
}

export default LogoMenu