import React from 'react'

export default function Auth() {
    return (
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <div className="login-popup" style={{ flex: 1 }}>
                <div className="tab tab-nav-boxed tab-nav-center tab-nav-underline">
                    <ul className="nav nav-tabs text-uppercase" role="tablist">
                        <li className="nav-item">
                            <a href="#sign-in" className="nav-link active">Sign In</a>
                        </li>
                        <li className="nav-item">
                            <a href="#sign-up" className="nav-link">Sign Up</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="sign-in">
                            <div className="form-group">
                                <label>Username or email address *</label>
                                <input type="text" className="form-control" name="username" id="username" required />
                            </div>
                            <div className="form-group mb-0">
                                <label>Password *</label>
                                <input type="text" className="form-control" name="password" id="password" required />
                            </div>
                            <div className="form-checkbox d-flex align-items-center justify-content-between">
                                <input type="checkbox" className="custom-checkbox" id="remember" name="remember" required />
                                <label htmlFor="remember">Remember me</label>
                                <a href="#">Last your password?</a>
                            </div>
                            <a href="#" className="btn btn-primary">Sign In</a>
                        </div>
                        <div className="tab-pane" id="sign-up">
                            <div className="form-group">
                                <label>Your Email address *</label>
                                <input type="text" className="form-control" name="email_1" id="email_1" required />
                            </div>
                            <div className="form-group mb-5">
                                <label>Password *</label>
                                <input type="text" className="form-control" name="password_1" id="password_1" required />
                            </div>
                            <p>Your personal data will be used to support your experience
                                throughout this website, to manage access to your account,
                                and for other purposes described in our <a href="#" className="text-primary">privacy policy</a>.</p>
                            <a href="#" className="d-block mb-5 text-primary">Signup as a vendor?</a>
                            <div className="form-checkbox d-flex align-items-center justify-content-between mb-5">
                                <input type="checkbox" className="custom-checkbox" id="agree" name="agree" required />
                                <label htmlFor="agree" className="font-size-md">I agree to the <a href="#" className="text-primary font-size-md">privacy policy</a></label>
                            </div>
                            <a href="#" className="btn btn-primary">Sign Up</a>
                        </div>
                    </div>
                    <p className="text-center">Sign in with social account</p>
                    <div className="social-icons social-icon-border-color d-flex justify-content-center">
                        <a href="#" className="social-icon social-facebook w-icon-facebook" />
                        <a href="#" className="social-icon social-twitter w-icon-twitter" />
                        <a href="#" className="social-icon social-google fab fa-google" />
                    </div>
                </div>
            </div>
        </div>
    )
}
