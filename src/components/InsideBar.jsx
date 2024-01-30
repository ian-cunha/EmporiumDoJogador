import { ListProfile, ListBar, Menu, NavBar, BtnBar, BtnProfile, ImageLogo } from "./Globals"
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"
import { auth } from "../config/Firebase"
import logo from "../assets/logo.svg"

export const InsideBar = () => {

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error))
  }

  function dotBar() {
    var barBtn = document.getElementById('nav')
    if (barBtn.style.display === 'flex') {
      barBtn.style.display = 'none'
    } else {
      barBtn.style.display = 'flex'
    }
  }

  function dropProfile() {
    var dropUser = document.getElementById('dropdownProfile')
    if (dropUser.style.display === 'flex') {
      dropUser.style.display = 'none'
    } else {
      dropUser.style.display = 'flex'
    }
  }

  return (
    <>
      <NavBar>
        <Menu className="bi bi-list" onClick={dotBar}></Menu>
        <ImageLogo onClick={() => navigate('/')} src={logo} />
        <ListBar id="nav">
          <BtnBar>Sua ficha</BtnBar>
          <BtnBar>Biblioteca</BtnBar>
          <BtnBar onClick={() => navigate('/referencias')}>Referência Rápida</BtnBar>
        </ListBar>
        <BtnProfile onClick={dropProfile} className="bi bi-person" />
      </NavBar>

      <ListProfile id='dropdownProfile'>
        <BtnBar onClick={handleSignOut}>Fechar sessão</BtnBar>
        <BtnBar>Ajuda</BtnBar>
      </ListProfile>
    </>
  )
}