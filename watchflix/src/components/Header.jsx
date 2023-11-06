import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(page) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(page.login ? "/login" : "/signup");
  }
  return (
    <StyleHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" onClick={handleNavigate} />
      </div>
      <button onClick={handleNavigate}>
        {page.login ? "Log In" : "Sign Up"}
      </button>
    </StyleHeader>
  );
}

const StyleHeader = styled.header`
  padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
      cursor: pointer;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.4rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
