import useAuth from '../hooks/useAuth';
import { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import './Login.css'

import { jwtDecode } from 'jwt-decode';
import axios from '../api/axios';

const Login = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from?.pathname || "/";

  const errRef = useRef();
  const [ errMsg, setErrMsg ] = useState('');

  const onSubmit = async data => {
    if (errors.username || errors.password) {
      console.error("no username or password");
      return
    }

    // Submit login request to server
    try {
      const rep = await axios.post("/login", JSON.stringify(data));
      const accessToken = rep?.data?.access_token;
      const refreshToken = rep?.data?.refresh_token;

      // Parse the access token for the user claims
      const claims = jwtDecode(accessToken);
      setAuth({ claims, accessToken, refreshToken });

      navigate(redirect, { replace: true});
    } catch (err) {
      if (err?.response?.data) {
        setErrMsg(err.response.data.error);
      } else {
        setErrMsg('Could not sign you in.');
      }
      errRef.current.focus();
    }
  }

  return (
    <div className="container">

      <section className="form-signin w-100 m-auto mt-5">
        <div className="text-center">
          <img src="/logo192.png?url" alt="Logo" className='mb-4' width="72" height="72" />
          <h1 className="h3 mb-3 fw-normal">Player Sign In</h1>
        </div>
        <div className='alerts'>
          <Alert ref={errRef} variant='danger' className={errMsg ? "show" : "d-none"}>{errMsg}</Alert>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating">
            <Form.Control
              type="text"
              placeholder="email"
              autoComplete="email"
              {...register("email", { required: true })}
            />
            <Form.Label>Email</Form.Label>
          </div>
          <div className="form-floating">
            <Form.Control
              type="password"
              placeholder="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
            />
            <Form.Label>Password</Form.Label>
          </div>
          <Button type="submit" className="btn btn-primary w-100 py-2">Login</Button>
        </Form>
      </section>

    </div>
  );
}

export default Login;