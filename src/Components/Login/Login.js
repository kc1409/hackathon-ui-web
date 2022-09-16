import { React, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Lottie from 'lottie-react-web';
import IconLogo from '../../assets/images/SAIL.webp';
import Loading from '../Loading';
import { useNavigate } from "react-router-dom";
import './styles.css'
import { CardContent, Divider } from '@mui/material';
import animation from '../../assets/images/118480-mental-health-awareness.json';

function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = () => {

    if (userName == "" || password == "") {
      if (userName == "" && password == "") {
        setIsNameValid(true);
        setIsPasswordValid(true);

        setTimeout(() => {
          setIsNameValid(false);
          setIsPasswordValid(false);
        }, 2000);
      }
      else if (userName == "") {
        setIsNameValid(true);

        setTimeout(() => {
          setIsNameValid(false);
        }, 2000);
      }
      else if (password == "") {
        setIsPasswordValid(true);

        setTimeout(() => {
          setIsPasswordValid(false);
        }, 2000);
      }
    }
    else {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        navigate('/lens')
      }, 2000);
    }
  }  
  
  return (
    <div>
      { isLoading ? <Loading /> :
        <div id="login">
          <div id="header">
            <Box
              id="logo"
              component="img"
              sx={{
                height: 30,
                width: 30
              }}
              src={IconLogo}
          />
          </div>
          <div id="content">
            <div id="loginanimation">
                  <Lottie options={{
                animationData: animation
              }} />
            </div>
            <div id="card">
                <Card id="card-comp">
                  <CardContent>
                    <div id="input">
                      <div id="username">
                      <TextField
                          id="username-comp"
                          label="User Name" 
                          variant="outlined"
                          error={isNameValid} 
                          onChange={(event) => {setUserName(event.target.value)}}/>
                      </div>
                      <div id="password">
                      <TextField 
                          id="password-comp"
                          label="Password" 
                          type="password"
                          error={isPasswordValid}
                          onChange={(event) => {setPassword(event.target.value)}}/>
                      </div>
                      <div id="submit">
                        <Button id="submit-comp" variant="contained" onClick={handleSubmit}>
                          Submit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Login