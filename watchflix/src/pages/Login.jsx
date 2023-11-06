import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Header, BgImage } from "../components";
import { firebaseAuth, provider } from "../utils/firebase";

export default function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!formValues.email && !formValues.password) {
      toast.error("Email and Password are required");
    } else {
      try {
        await signInWithEmailAndPassword(
          firebaseAuth,
          formValues.email,
          formValues.password
        );
        toast.success("Login Success");
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  async function handleGoogleLogIn() {
    try {
      const data = await signInWithPopup(firebaseAuth, provider);
      console.log(data);
      toast.success(`Welcome back ${data.user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BgImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <form className="container flex column">
              <input
                type="email"
                placeholder="Email address"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formValues.email}
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formValues.password}
                name="password"
              />
              <button onClick={handleLogin}>Login to your account</button>
              <div className="google-div">
                <button
                  className="google-button"
                  type="button"
                  onClick={handleGoogleLogIn}
                >
                  <FcGoogle />
                  Google
                </button>
              </div>
            </form>
          </div>
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
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 00, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        gap: 2rem;
        background-color: #000000b0;
        width: 25vw;
        padding: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
          .google-div {
            .google-button {
              width: 100%;
              background: rgba(101, 149, 227, 0.818);
              display: flex;
              justify-content: center;
              gap: 0.4rem;
              align-items: center;
            }
          }
        }
      }
    }
  }
`;
