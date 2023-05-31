import React, { useState, useEffect } from 'react';
import { GetUserDetailByUserName } from '../../services/Services';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
function UserData({ }) {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await GetUserDetailByUserName();
                // const data = await response.json();
                console.log(response);
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    if (!userData) {
        return <p>Loading user data...</p>;
    }

    return (
        <section class="container vw-100" style={{ backgroundColor: '#eee' }}>
            <div class="container py-5">


                <div class="row">
                    <div class="col-lg-4">
                        <div class="card mb-4">
                            <div class="card-body text-center">
                                <img src={(userData.gender === '1') ? 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp' : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'} alt="avatar"
                                    class="rounded-circle img-fluid" style={{ width: '150px' }}></img>
                                <h5 class="my-2">{userData.username}</h5>
                                <p class="text-muted mb-1">Silver Level</p>
                                <div class="d-flex justify-content-center mb-2">
                                    <Link to={'/userdata/editprofile'} class="btn btn-primary">Edit Profile</Link>

                                </div>
                            </div>
                        </div>
                        <div class="card mb-4 mb-lg-0">
                            <div class="card-body p-0">
                                <ul class="list-group list-group-flush rounded-3">
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fas fa-globe fa-lg text-warning"></i>
                                        <p class="mb-0">@website</p>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                                        <p class="mb-0">@github</p>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                                        <p class="mb-0">@twitter</p>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                                        <p class="mb-0">@instagram</p>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i class="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                                        <p class="mb-0">@facebook</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Full Name</p>
                                    </div>
                                    <div class="col-sm-9">
                                        {(userData.fullname) ? <p class="text-muted mb-0">{(userData.fullname)}</p> : <p class=" text-danger mb-0">Please fill in your data</p>}

                                    </div>
                                </div>
                                <hr></hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Email</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{userData.email}</p>
                                    </div>
                                </div>
                                <hr></hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Date Of Birth</p>
                                    </div>
                                    <div class="col-sm-9">
                                        {(userData.dob) ? <p class="text-muted mb-0">{(userData.dob)}</p> : <p class=" text-danger mb-0">Please fill in your data</p>}
                                    </div>
                                </div>
                                <hr></hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Gender</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{(userData.gender === '1') ? 'Male' : 'Female'}</p>
                                    </div>
                                </div>
                                <hr></hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Phone Number</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">{userData.phone_number}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>



            </div>
        </section>
    );
}

export default UserData;
