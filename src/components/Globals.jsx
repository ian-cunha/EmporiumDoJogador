import styled from "styled-components";

export const View = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
`

export const NavBar = styled.nav`
top: 0;
width: 100vw;
height: 80px;
display: flex;
justify-content: space-around;
align-items: center;
position: fixed;
z-index: 5;
box-shadow: 0 0.2px white;
`

export const Menu = styled.button`
border-radius: 100px;
margin: 14px;
border-style: none;
font-size: 3em;
font-weight: 600;
border-color: transparent;
background: transparent;
color: white;
display: none;
cursor: pointer;
@media (max-width: 768px) {
  display: block;
  }
`

export const ListBar = styled.div`
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 768px) {
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  top: 80px;
  margin-left: 10px;
  margin-right: 10px;
  }
`

export const ListDrop = styled.div`
animation: slideInDown;
animation-duration: 1s;
flex-direction: column;
padding: 24px;
margin-top: 80px;
background-color: #121212;
top: 0;
width: 100vw;
height: 95vh;
display: none;
justify-content: center;
align-items: flex-start;
position: fixed;
z-index: 5;
`

export const BtnBar = styled.button`
padding: 10px 20px;
margin: 5px 5px;
cursor: pointer;
border-color: white;
background-color: #121212A6;
border-radius: 5px;
color: white;
font-weight: bold;
transition: 0.5s;
&:hover {
  color: black;
  border-color: transparent;
  background-color: white;
}
@media (max-width: 768px) {
  width: 100%;
  padding: 15px 20px;
  margin: 5px 5px;
}
`

export const BtnProfile = styled.button`
padding: 10px 12px;
margin: 0 5px;
cursor: pointer;
color: white;
font-weight: bold;
background-color: #282828;
border: 0;
border-radius: 100%;
font-size: 1em;
transition: 0.5s;
&:hover {
}
@media (max-width: 768px) {
  padding: 10px 12px;
  margin: 5px 5px;
}
`

export const Btn = styled.button`
padding: 10px 20px;
margin: 0 5px;
cursor: pointer;
border-color: white;
background-color: #121212A6;
border-radius: 5px;
color: white;
font-weight: bold;
transition: 0.5s;
&:hover {
  color: black;
  border-color: transparent;
  background-color: white;
}
`

export const DropBox = styled.button`
padding: 30px 20px;
margin: 0 5px;
background-color: transparent;
border: none;
color: white;
cursor: pointer;
&:hover {
  box-shadow: 0 2px white;
}
@media (max-width: 768px) {
  width: 100%;
  padding: 15px 20px;
  margin: 5px 5px;
}
`

export const Exit = styled.div`
cursor: pointer;
font-size: 2em;
margin: 0 5px;
&:hover {
  color: red;
}
`