import React, { Component } from 'react';
import { Formik } from 'formik';

class Auth extends Component{
    render(){
        return(
            <div>
                <Formik
                initialValues={
                    {
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    }
                }

                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                      errors.email = 'Invalid email address';
                    }

                    if(!values.password){
                        errors.password = 'Required';
                    }else if(values.password.length < 4){
                        errors.password = 'Password must be greatr then 3 charecter';
                    }

                    if(!values.passwordConfirm){
                        errors.passwordConfirm = 'Required';
                    }else if(values.password !== values.passwordConfirm){
                        errors.passwordConfirm = 'Password does not match!';
                    }
                    return errors;
                  }}

                onSubmit={(values) => {
                        console.log(values);
                    }
                }
                >

                {(
                    {
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) =>
                        (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <span style={{color: "red"}}>{errors.email}</span>
                                <br />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <span style={{color: "red"}}>{errors.password}</span>
                                <br />
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder="Enter your confirm password"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.passwordConfirm}
                                />
                                <span style={{color: "red"}}>{errors.passwordConfirm}</span>
                                <br />
                                <button type="submit" disabled={isSubmitting} className="btn btn-success">Submit</button>
                            </form>
                        )
                }

                </Formik>
            </div>
        )
    }
}
export default Auth;