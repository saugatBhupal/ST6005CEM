import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../constants/Colors'

const Wrapper = styled.div`

`
const Button = styled.button`
    width : 110px;
    background-color : ${Colors.strokeBlue};
    color : ${Colors.backgroundWhite};
    height : 50px;
    font-size : 18px;
    border-radius : 30px;
    border : none;
    cursor: pointer;
`
function FilledButton(props) {
  return (
    <Wrapper>
        <Button onClick={()=>props.onClick()}>
            {props.placeholder}
        </Button>
    </Wrapper>
  )
}

export default FilledButton