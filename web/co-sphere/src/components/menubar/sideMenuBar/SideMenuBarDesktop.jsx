import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import FilledButton from "../../buttons/FilledButton";
import LogoMenu from "../../logo/LogoMenu";

const Wrapper = styled.div`
  height: 100vh;
  width: 300px;
  background-color: ${Colors.justWhite};
  border-right: 1px solid ${Colors.greyOutlineShadow};
  position: fixed;
`;
const Logo = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
  border-right: 1px solid ${Colors.greyOutlineShadow};
`;
const Container = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  flex-direction: column;
`;

const Menu = styled.div`
  background-color: white;
  flex-grow: 1; /* Ensures Menu takes up remaining space */
  li {
    list-style: none;
    font-size: 16px;
    font-weight: 400;
    color: ${Colors.menuUnselected};
    width: 90%;
    margin: 10px auto;
    min-height: 50px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
    stroke: ${Colors.menuUnselected};
    &:hover {
      color: ${Colors.justBlack};
      background-color: ${Colors.menuSelected};
      stroke: ${Colors.justBlack};
    }
    svg {
      margin: 0 20px 0 10px;
    }
  }
  ul {
    margin-top: 40px;
    padding: 0;
    display: flex;
    flex-direction: column;
    li {
      margin: 2px auto;
    }
  }
`;
const End = styled.div`
  width: 60%;
  margin: auto;
  margin-top: auto;
  height: fit-content;
`;
function SideMenuBarDesktop() {
  return (
    <Wrapper>
      <Logo>
        <LogoMenu />
      </Logo>
      <Container>
        <Menu>
          <li>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 6.25V16.75M6.25 11.5H16.75M8.35 22H14.65C19.9 22 22 19.9 22 14.65V8.35C22 3.1 19.9 1 14.65 1H8.35C3.1 1 1 3.1 1 8.35V14.65C1 19.9 3.1 22 8.35 22ZM9.4 16.75H13.6C15.3325 16.75 16.75 15.3325 16.75 13.6V9.4C16.75 7.6675 15.3325 6.25 13.6 6.25H9.4C7.6675 6.25 6.25 7.6675 6.25 9.4V13.6C6.25 15.3325 7.6675 16.75 9.4 16.75Z"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <a>Home</a>
          </li>
          <ul>
            <li>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 6.25V16.75M6.25 11.5H16.75M8.35 22H14.65C19.9 22 22 19.9 22 14.65V8.35C22 3.1 19.9 1 14.65 1H8.35C3.1 1 1 3.1 1 8.35V14.65C1 19.9 3.1 22 8.35 22ZM9.4 16.75H13.6C15.3325 16.75 16.75 15.3325 16.75 13.6V9.4C16.75 7.6675 15.3325 6.25 13.6 6.25H9.4C7.6675 6.25 6.25 7.6675 6.25 9.4V13.6C6.25 15.3325 7.6675 16.75 9.4 16.75Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a>Browse Jobs</a>
            </li>
            <li>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 6.25V16.75M6.25 11.5H16.75M8.35 22H14.65C19.9 22 22 19.9 22 14.65V8.35C22 3.1 19.9 1 14.65 1H8.35C3.1 1 1 3.1 1 8.35V14.65C1 19.9 3.1 22 8.35 22ZM9.4 16.75H13.6C15.3325 16.75 16.75 15.3325 16.75 13.6V9.4C16.75 7.6675 15.3325 6.25 13.6 6.25H9.4C7.6675 6.25 6.25 7.6675 6.25 9.4V13.6C6.25 15.3325 7.6675 16.75 9.4 16.75Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a>Create </a>
            </li>
            <li>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 6.25V16.75M6.25 11.5H16.75M8.35 22H14.65C19.9 22 22 19.9 22 14.65V8.35C22 3.1 19.9 1 14.65 1H8.35C3.1 1 1 3.1 1 8.35V14.65C1 19.9 3.1 22 8.35 22ZM9.4 16.75H13.6C15.3325 16.75 16.75 15.3325 16.75 13.6V9.4C16.75 7.6675 15.3325 6.25 13.6 6.25H9.4C7.6675 6.25 6.25 7.6675 6.25 9.4V13.6C6.25 15.3325 7.6675 16.75 9.4 16.75Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a>Tasks</a>
            </li>
            <li>
              <svg
                width="24"
                height="17"
                viewBox="0 0 1 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.25"
                  x2="0.25"
                  y2="17"
                  stroke="#9199AF"
                  stroke-width="0.5"
                />
              </svg>
              <a>Assigned To Me</a>
            </li>
            <li>
              <svg
                width="24"
                height="17"
                viewBox="0 0 1 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.25"
                  x2="0.25"
                  y2="17"
                  stroke="#9199AF"
                  stroke-width="0.5"
                />
              </svg>

              <a>Assigned By Me</a>
            </li>
            <li>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 6.25V16.75M6.25 11.5H16.75M8.35 22H14.65C19.9 22 22 19.9 22 14.65V8.35C22 3.1 19.9 1 14.65 1H8.35C3.1 1 1 3.1 1 8.35V14.65C1 19.9 3.1 22 8.35 22ZM9.4 16.75H13.6C15.3325 16.75 16.75 15.3325 16.75 13.6V9.4C16.75 7.6675 15.3325 6.25 13.6 6.25H9.4C7.6675 6.25 6.25 7.6675 6.25 9.4V13.6C6.25 15.3325 7.6675 16.75 9.4 16.75Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a>Jobs</a>
            </li>
            <li>
              <svg
                width="24"
                height="17"
                viewBox="0 0 1 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.25"
                  x2="0.25"
                  y2="17"
                  stroke="#9199AF"
                  stroke-width="0.5"
                />
              </svg>
              <a>Created By Me</a>
            </li>
            <li>
              <svg
                width="24"
                height="17"
                viewBox="0 0 1 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.25"
                  x2="0.25"
                  y2="17"
                  stroke="#9199AF"
                  stroke-width="0.5"
                />
              </svg>

              <a>My Applications</a>
            </li>
          </ul>
        </Menu>
        <End>
          <FilledButton placeholder="Sign out" />
        </End>
      </Container>
    </Wrapper>
  );
}

export default SideMenuBarDesktop;
