import './Edit.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShowAlertToast, ShowSuccessToast } from '../../services/ToastService';
import { useNavigate } from 'react-router-dom';
import { GetUserDetailByUserName } from '../../services/Services';
import { http } from '../../helpers/request';
function ChangePassword() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const handleCancel = () => {
        navigate(-1);
    };
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
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            ShowAlertToast("Mismatch new password confirm!");
            return;
        }

        const updatedUser = {
            old_password: oldPassword,
            new_password: password,
            user_id: localStorage.getItem('user_id'),
        };
        try {

            const response = await http.post(
                `http://localhost:8080/user/update_password?user_id=${updatedUser.user_id}&new_password=${updatedUser.new_password}&old_password=${updatedUser.old_password}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

            if (response.data.status_code === 200) {
                console.log(response.data);
                ShowSuccessToast('Info changed successfully');
                navigate(-1);
            }

        } catch (error) {
            console.error(error);
        }

    }
    return (
        <form onSubmit={handleFormSubmit} class="col-xxl-4 mx-auto">
            <div class="bg-secondary-soft px-4 py-5 rounded">
                <div class="row g-3">
                    <h4 class="my-4">Change Password</h4>

                    <div class="col-md-6">
                        <label for="exampleInputPassword1" class="form-label">Old password *</label>
                        <input type="password" required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            class="form-control" id="exampleInputPassword1" />
                    </div>

                    <div class="col-md-6">
                        <label for="exampleInputPassword2" class="form-label">New password *</label>
                        <input type="password" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword2" />
                    </div>

                    <div class="col-md-12">
                        <label for="exampleInputPassword3" class="form-label">Confirm Password *</label>
                        <input type="password" required
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            class="form-control" id="exampleInputPassword3" />
                    </div>
                </div>
            </div>
            <div class="gap-3 d-md-flex justify-content-md-end text-center">
                <button type="button" class="btn btn-danger btn-lg" onClick={handleCancel} >Cancel</button>
                <button type="submit" class="btn btn-primary btn-lg">Save changes</button>
            </div>
        </form>
    )
}
export default ChangePassword;