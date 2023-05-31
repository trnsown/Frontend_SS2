import { Avatar, Grid, Paper, Typography, TextField, Button, Checkbox, setRef } from "@material-ui/core";
import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FormHelperText } from "@mui/material";
import { red } from "@material-ui/core/colors";
import { color } from "@mui/system";
import { ShowAlertToast, ShowSuccessToast } from "../../services/ToastService";
const Signup = () => {
    const paperStyle = { padding: 20, width: "100%", margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#00BCD4' }
    const marginTop = { marginTop: 10 }
    const initialValues = {
        username: '',
        email: '',
        gender: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, "It' s too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        gender: Yup.string().oneOf(["1", "0"], "Required").required('Required'),
        phone_number: Yup.number().typeError("Enter valid Phone number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions")
    })
    const onSubmit = async (values, props) => {
        console.log(values);
        console.log(props);
        const response = await fetch('http://localhost:8080/user-register/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const data = await response.json();
        (data.status_code === 409) ? ShowAlertToast("Register failed!") : ShowSuccessToast("Register success!")
        setTimeout(() => {

            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
    }
    return (
        <Grid >
            <Paper style={paperStyle}  >
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <div class=" col" >
                            <Form class="mx-auto">
                                <Field as={TextField} fullWidth name="username" label='Username' placeholder="Enter your username" helperText={<ErrorMessage name="username" />} />
                                <Field as={TextField} fullWidth name='email' label='Email' placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                                <FormControl style={marginTop}>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <Field as={RadioGroup}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        // defaultValue="female"
                                        // name="radio-buttons-group"
                                        name='gender'
                                        style={{ display: 'initial' }}
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="Female" />
                                        <FormControlLabel value="1" control={<Radio />} label="Male" />
                                    </Field >
                                </FormControl>
                                <FormHelperText><ErrorMessage name='gender' /></FormHelperText>
                                <Field as={TextField} name="phone_number" fullWidth label='Phone Number'
                                    placeholder="Enter your phone number" helperText={<ErrorMessage name="phone_number" />} />
                                <Field as={TextField} name="password" fullWidth label='Password' type="password" placeholder="Enter your password "
                                    helperText={<ErrorMessage name="password" />} />
                                <Field as={TextField} name="confirmPassword" fullWidth label='Confirm Password' type="password" placeholder="Confirm your password "
                                    helperText={<ErrorMessage name="confirmPassword" />} />
                                <FormControlLabel control={<Field as={Checkbox} name="termsAndConditions" />} label="I accept the terms and conditions. " />
                                <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
                                <Button type='submit' variant="contained" disabled={props.isSubmitting} color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
                            </Form>
                        </div>

                    )}
                </Formik>
            </Paper>

        </Grid>

    )
}

export default Signup;