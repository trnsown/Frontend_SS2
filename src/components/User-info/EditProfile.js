import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShowSuccessToast } from '../../services/ToastService';
import { useNavigate } from 'react-router-dom';
import { GetUserDetailByUserName } from '../../services/Services';
import './Edit.css'
const EditProfile = () => {
    const [userData, setUserData] = useState({});
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await GetUserDetailByUserName();
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    useEffect(() => {
        setFullname(userData.fullname || '');
        setGender(userData.gender === '1' ? 'male' : 'female');
        setEmail(userData.email || '');
        setDob(userData.dob || '');
        setPhoneNumber(userData.phone_number || '');
    }, [userData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            fullname: fullname,
            gender: gender === 'male' ? '1' : '0',
            email: email,
            dob: dob,
            phone_number: phoneNumber,
            password: userData.password,
            username: userData.username,
            user_id: localStorage.getItem('user_id'),
            role_id: userData.role_id,
        };

        try {

            const response = await axios.post('http://localhost:8080/user/update', updatedUser, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log(response.data);
            ShowSuccessToast('Info changed successfully');
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    };

    if (Object.keys(userData).length === 0) {

        return <div>Loading...</div>;
    }
    const handleCancel = () => {
        navigate(-1);
    };
    return (

        <div class="container n">
            <div class="row">
                <div class="col-12 ">

                    <div class="my-5">
                        <h3 class="text-center">Edit Profile</h3>
                        <hr />
                    </div>

                    <form onSubmit={handleFormSubmit} class="file-upload mx-auto">
                        <div class="row mb-5 gx-5 ">

                            <div class="col-12 mb-5 ">
                                <div class="bg-secondary-soft px-4 py-5 rounded ">
                                    <div class="row g-3 ">
                                        <h4 class="mb-4 mt-0 text-center ">Contact detail</h4>

                                        <div>
                                            <label class="form-label" for="fullname">Full name: </label>
                                            <input
                                                className='form-control'
                                                type="text"
                                                id="fullname"
                                                value={fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div >
                                            <label class="form-label" for="gender">Gender: </label>
                                            <select
                                                class="form-control"
                                                id="gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                required
                                            >
                                                <option value="">-- Select Gender --</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="form-label" for="phone">Phone number: </label>
                                            <input class="form-control" type="text"
                                                id="phone"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                required />
                                        </div>

                                        <div >
                                            <label class="form-label" for="email">Email: </label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div >
                                            <label for="dob" class="form-label">Date of Birth: </label>
                                            <input
                                                className='form-control'
                                                type="date"
                                                id="dob"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                required
                                            />
                                        </div>


                                    </div>
                                </div>
                            </div>


                        </div>

                        <div class="gap-3 d-md-flex justify-content-md-end text-center">
                            <button type="button" class="btn btn-danger btn-lg" onClick={handleCancel} >Cancel</button>
                            <button type="submit" class="btn btn-primary btn-lg">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default EditProfile;
