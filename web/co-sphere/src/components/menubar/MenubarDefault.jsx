import React from 'react'
import styled from 'styled-components'
import LogoMenu from '../logo/LogoMenu'
import { Colors } from '../../constants/Colors'
import OutlinedButton from '../buttons/OutlinedButton'
import TransparentButton from '../buttons/TransparentButton'
import MenubarSpacer from '../spacer/MenubarSpacer'

const Wrapper = styled.div`
    width : 100vw;
    position : fixed;
`
const Container = styled.div`
    height : 60px;
    margin : 10px 20px;
    display : flex;
    justify-content : space-between;
    align-items: center;
`
const Logo = styled.div`
`

const MenuItems = styled.div`
    ul{
        width : inherit;
        font-size : 18px;
        color : ${Colors.fontBlack};
        font-weight : 300;
        display : flex;
        justify-content : space-between;
        align-items : center;
    }
    li{
        list-style : none;
        margin : auto 15px;
    }
`

const Action = styled.div`
    width :300;
    display : flex;
    justify-content : space-between;
`
function MenubarDefault() {
  return (
    <Wrapper>
        <Container>
            <Logo>
                <LogoMenu/>
            </Logo>
            <MenuItems>
                <ul>
                    <li>
                        Find jobs
                    </li>
                    <li>
                        Find a talent
                    </li>
                    <li>
                        Browse projects
                    </li>
                    <li>
                        Features
                    </li>
                </ul>
            </MenuItems>
            <Action>
                <TransparentButton placeholder = "Sign in" onClick = {()=>alert("hello")}/>
                <OutlinedButton placeholder = "Sign up" onClick = {()=>alert("hello")}/>
            </Action>
        </Container>
    </Wrapper>
  )
}

export default MenubarDefault