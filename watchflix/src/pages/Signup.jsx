import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { firebaseAuth } from "../utils/firebase";
import { Header, BgImage } from "../components";

export default function Signup() {
  const [showPassword, setshowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    const { email, password } = formValues;
    if (!email && !password) {
      toast.error("Email and Password are required");
    } else {
      try {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        toast.success("New user created");
      } catch (error) {
        let msg = error.message.split(":")[1];
        toast.error(msg);
      }
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BgImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, Tv shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart the
              membership
            </h6>
          </div>
          <form className="form">
            <input
              required
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                required
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button type="button" onClick={() => setshowPassword(true)}>
                Get Started
              </button>
            )}
          </form>
          {showPassword && (
            <button type="submit" onClick={handleSignUp}>
              Sign Up
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ password }) =>
          password ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        gap: 0.2rem;
      }
      input {
        color: black;
        border: none;
        padding: 1.5rem;
        border: 1px solid black;
        &:focus {
          outline: none;
        }
        border-radius: 0.4rem;
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: bolder;
        font-size: 1.05rem;
        border-radius: 0.4rem;
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color: white;
      font-weight: bolder;
      font-size: 1.05rem;
      border-radius: 0.4rem;
    }
  }
`;
