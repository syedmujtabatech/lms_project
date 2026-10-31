import React, { useState } from 'react';
import Layout from '../../../common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import UserSidebar from '../../../common/UserSidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, getToken } from '../../../common/Config';
import toast from 'react-hot-toast';

const CreateCourse = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = getToken();
            const res = await fetch(`${apiUrl}/course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            setLoading(false);
            if (result.status === 200 && result.data) {
                toast.success(result.message || 'Course created successfully');
                navigate('/account/course/edit/' + result.data.id);
            } else if (result.status === 400 && result.errors) {
                const firstErr = Object.values(result.errors)[0];
                toast.error(Array.isArray(firstErr) ? firstErr[0] : 'Validation failed');
            } else {
                toast.error(result.message || 'Failed to create course');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error creating course:', error);
            toast.error('Unable to create course');
        }
    };

    return (
        <Layout>
            <section className='section-4'>
                <div className='container pb-5 pt-3'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/account/dashboard">Account</Link></li>
                            <li className="breadcrumb-item"><Link to="/account/my-courses">My Courses</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Create Course</li>
                        </ol>
                    </nav>

                    <div className='row'>
                        <div className='col-md-12 mt-4 mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h2 className='h4 mb-0 pb-0'>Create Course</h2>
                                <Link to="/account/my-courses" className="btn btn-outline-secondary btn-sm">
                                    &larr; Back to My Courses
                                </Link>
                            </div>
                        </div>

                        <div className='col-lg-3 account-sidebar'>
                            <UserSidebar />
                        </div>

                        <div className='col-lg-9'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='card border-0 shadow-lg'>
                                            <div className='card-body p-4'>
                                                <h4 className='h5 border-bottom pb-3 mb-3'>New Course Basic Info</h4>
                                                <div className="mb-3">
                                                    <label htmlFor='title' className="form-label">Course Title</label>
                                                    <input
                                                        type='text'
                                                        id='title'
                                                        {...register('title', {
                                                            required: 'The title field is required.',
                                                            minLength: { value: 5, message: 'Minimum 5 characters required.' }
                                                        })}
                                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                        placeholder='e.g. Full-Stack Web Development with Laravel & React'
                                                    />
                                                    {errors.title && (
                                                        <p className='invalid-feedback'>{errors.title.message}</p>
                                                    )}
                                                    <small className="text-muted d-block mt-1">
                                                        Give your course a clear, engaging title. You can fill out details, pricing, and curriculum next.
                                                    </small>
                                                    <button disabled={loading} type="submit" className='btn btn-primary mt-4'>
                                                        {loading ? 'Creating...' : 'Continue to Course Editor'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CreateCourse;
