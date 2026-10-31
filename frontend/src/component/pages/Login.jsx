import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../common/Layout'
import { useForm } from 'react-hook-form';
import { apiUrl } from '../common/Config';
import { AuthContext } from '../Context'; 
import toast from 'react-hot-toast';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.status === 200) {
                const userInfo = {
                    name: result.name,
                    id: result.id,
                    token: result.token,
                    email: result.email
                };
                localStorage.setItem('userInfolms', JSON.stringify(userInfo));
                localStorage.setItem('userInfoLms', JSON.stringify(userInfo));
                login(userInfo);
                toast.success('Logged in successfully!');
                navigate('/account/dashboard');
            } else {
                toast.error(result.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Unable to connect to server. Please try again.');
        }
    };

    return (
        <Layout>
            <div className='container py-5 mt-5'>
                <div className='d-flex align-items-center justify-content-center'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='card border-0 shadow login' style={{ minWidth: '380px' }}>
                            <div className='card-body p-4'>
                                <h3 className='border-bottom pb-3 mb-3'>Login</h3>
                                <div className='mb-3'>
                                    <label className='form-label' htmlFor="email">Email</label>
                                    <input 
                                        {...register('email', {
                                            required: "The email field is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            } 
                                        })}
                                        type="text"
                                        id="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder='Email'
                                    />   
                                    {errors.email && <p className='invalid-feedback'>{errors.email.message}</p>}                             
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label' htmlFor="password">Password</label>
                                    <input 
                                        {...register('password', {
                                            required: "The password field is required."
                                        })}
                                        type="password"
                                        id="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                        placeholder='Password'
                                    />
                                    {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}   
                                </div>
                                
                                <div className='d-flex justify-content-between align-items-center'>
                                    <button type="submit" className='btn btn-primary'>Login</button>
                                    <Link to="/account/register" className='text-secondary'>Register Here</Link>
                                </div>                            
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
