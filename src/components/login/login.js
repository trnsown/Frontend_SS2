import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from "react-router-dom";
import FromControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { http } from "../../helpers/request";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { ShowAlertToast, ShowSuccessToast } from "../../services/ToastService";
import jwtDecode from "jwt-decode";
const Login = ({ isAuthenticated, setIsAuthenticated }) => {

    const paperStyle = { padding: 20, width: "100%", margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#00BCD4' }
    const btstyle = { margin: '8px 0' }
    const initialValues = {
        username: "",
        password: "",
        remember: false
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string().required("required")
    })
    const navigate = useNavigate();
    const onSubmit = async (values, props) => {
        // var response=await http.get(`/users`)
        // console.log(response.data);
        localStorage.removeItem('token');
        const { data } = await http.post(`/user-auth/authenticate`, values)
        if (data.status_code === 200) {
            console.log(data);
            const token = data.data.accessToken;
            var tokenDecoded = jwtDecode(token);
            localStorage.setItem('token', token);
            localStorage.setItem('username', values.username)
            localStorage.setItem('isAuthenticated', "true")
            localStorage.setItem('user_id', tokenDecoded.id);
            setIsAuthenticated(true);
            navigate('/');
            setTimeout(() => {
                props.resetForm()
                props.setSubmitting(true)
            }, 2000)
            ShowSuccessToast("Login Successful")
        } else {
            ShowAlertToast("Wrong username or password");
        }


    }
    return (
        <Grid style={{ margin: '50px 0', width: '100%' }} >
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <div class="col ">
                            <Form class="mx-auto">

                                <Field as={TextField} label='Username' name="username" placeholder="Enter username" fullWidth required
                                    helperText={<ErrorMessage name="username" />} />
                                <Field as={TextField} label='Password' name="password" placeholder="Enter password" type='password' fullWidth required
                                    helperText={<ErrorMessage name="password" />} />
                                <Field as={FromControlLabel}
                                    name="remember"
                                    control={
                                        <Checkbox

                                            color='primary'
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Button type='submit' color="primary"
                                    variant='contained' style={btstyle} fullWidth
                                    disabled={props.isSubmitting}>{props.isSubmitting ? "Loading" : "Sign in"}</Button>
                            </Form>
                        </div>

                    )}
                </Formik>
                <div class="col-lg-12 text-center">
                        <Typography>
                            <Link href="#">
                                Forgot password ?
                            </Link>
                        </Typography>

                        <Typography> Do you have an account ?
                            <Link to="/signup">
                                Sign up ?
                            </Link>
                        </Typography>
                </div>


            </Paper>
        </Grid>

    )
}

export default Login