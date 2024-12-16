import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../constants/Colors'

const Wrapper = styled.div`

`
const Button = styled.button`
    width : 110px;
    border : 1px solid ${Colors.strokeBlue};
    color : ${Colors.strokeBlue};
    background-color : transparent;
    height : 50px;
    font-size : 18px;
    border-radius : 30px;
    cursor: pointer;
`
function OutlinedButton(props) {
  return (
    <Wrapper>
        <Button onClick={()=>props.onClick()}>
            {props.placeholder}
        </Button>
    </Wrapper>
  )
}

export default OutlinedButton