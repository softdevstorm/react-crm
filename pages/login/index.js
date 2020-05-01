import React, { useState, useCallback, Component } from "react";
import Head from "next/head";
import router from "next/router";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { postLogin } from "../../lib/auth";

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            email: '', 
            password: '', 
            emailError: '', 
            passwordError: '', 
            loginError: '' 
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail (event) {
        this.setState({ emailError: '' });
        this.setState({ error: '' });
        this.setState({ email: event.target.value });
    }

    handleChangePassword (event) {
        this.setState({ passwordError: '' });
        this.setState({ error: '' });
        this.setState({ password: event.target.value });
    }

    setProfile(profile){
        // Saves profile data to localStorage
        localStorage.setItem('profile', profile)
    }

    async handleSubmit (event) {
        event.preventDefault()
        if (!this.state.email) {
            this.setState({ emailError: 'Email is Required' });
        }
        if (!this.state.password) {
            this.setState({ passwordError: 'Password is Required' });
        }
        
        if (this.state.email && this.state.password) {
            postLogin(this.state.email, this.state.password)
            // AuthService.postLogin(this.state.email, this.state.password)
            .then(data => {
                if (data.data.authenticated) {
                    this.setProfile(JSON.stringify(data.data.account));
                    localStorage.setItem('authenticate', 'true')
                    router.push("/overview");
                } else {
                    this.setState({ error: 'email or password is wrong' })
                }
            })
            .catch(error => {
                this.setState({ error: 'email or password is wrong' })
            })
        }
    };

    render() {
        return ( 
            <main className = "loginContainer" >
                <Head >
                    <title>Login</title>
                    <link href = "https://storage.googleapis.com/crmspy/assets/fonts/pro/css/fontawesome.css" />
                    <link rel = "icon" href = "/favicon.ico" />
                    <link rel = "stylesheet" type = "text/css" charSet = "UTF-8" href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                    <link rel = "stylesheet" type = "text/css" href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                    <link rel = "stylesheet" href = "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" />
                </Head>
                <video loop muted autoPlay 
                    style={{
                    position: "fixed",
                    minWidth: "100%",
                    minHeight: "100%",
                    objectFit: "contain"
                    }}
                >
                    <source src = "https://storage.googleapis.com/crmspy/assets/video.mp4"type = "video/mp4" />
                </video>
                <Container className="login-form-container">
                    <Row>
                        <Col className="col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-sm-12">
                            <Row>
                                <Col className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-sm-12 form-container">
                                    <div className = "logo-container" >
                                        <img src = "/images/CRMSpyLogo.png" height = "30px" />
                                    </div>
                                    <div className="login-form">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <input 
                                                    className="form-control" 
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    type="email"
                                                    value={this.state.email}
                                                    onChange={this.handleChangeEmail}
                                                />
                                                <p className={`error ${this.state.emailError && 'show'}`}>
                                                    {this.state.emailError && `${this.state.emailError}`}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    className="form-control" 
                                                    id="password"
                                                    name="password"
                                                    placeholder="password"
                                                    type="password"
                                                    value={this.state.password}
                                                    onChange={this.handleChangePassword}
                                                />
                                                <p className={`error ${this.state.passwordError && 'show'}`}>
                                                    {this.state.passwordError && `${this.state.passwordError}`}
                                                </p>
                                            </div>
                                            <div className="form-group clearfix submit">
                                                <button className="btn form-control" id="login" name="login" type="submit">LOGIN</button>
                                            </div>
                                            <p className={`error ${this.state.error && 'show'} auth-error`}>
                                                {this.state.error && `Error: ${this.state.error}`}
                                            </p>
                                        </form>
                                    </div> 
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }

}

export default Login;