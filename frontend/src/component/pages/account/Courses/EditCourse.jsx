import React, { useEffect, useState } from 'react';
import Layout from '../../../common/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserSidebar from '../../../common/UserSidebar';
import { apiUrl, getToken } from '../../../common/Config';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import CreateOutcome from './CreateOutcome';

const EditCourse = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [levels, setLevels] = useState([]);
    const [languages, setLanguages] = useState([]);

    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();

    const fetchCourseData = async () => {
        try {
            const token = getToken();
            const res = await fetch(`${apiUrl}/course/show/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.status === 200 && result.data) {
                reset({
                    title: result.data.title || '',
                    category_id: result.data.category_id || '',
                    level_id: result.data.level_id || '',
                    language_id: result.data.language_id || '',
                    description: result.data.description || '',
                    sell_price: result.data.sell_price || '',
                    cross_price: result.data.cross_price || ''
                });
            } else {
                toast.error('Course not found');
            }
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
            setInitialLoading(false);
        }
    };

    const fetchMetaData = async () => {
        try {
            const res = await fetch(`${apiUrl}/course/meta-data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setCategories(result.categories || []);
                setLevels(result.levels || []);
                setLanguages(result.languages || []);
            }
        } catch (error) {
            console.error('Error fetching metadata:', error);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = getToken();
            const res = await fetch(`${apiUrl}/course/update/${params.id}`, {
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
            if (result.status === 200) {
                toast.success(result.message || 'Course updated successfully');
            } else if (result.status === 400 && result.errors) {
                Object.keys(result.errors).forEach(field => {
                    setError(field, {
                        type: "server",
                        message: result.errors[field][0]
                    });
                });
            } else {
                toast.error(result.message || 'Update failed');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating course:', error);
            toast.error('Error updating course');
        }
    };

    useEffect(() => {
        fetchMetaData();
        fetchCourseData();
    }, [params.id]);

    return (
        <Layout>
            <section className='section-4'>
                <div className='container pb-5 pt-3'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/account/dashboard">Account</Link></li>
                            <li className="breadcrumb-item"><Link to="/account/my-courses">My Courses</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit Course</li>
                        </ol>
                    </nav>

                    <div className='row'>
                        <div className='col-md-12 mt-4 mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h2 className='h4 mb-0 pb-0'>Edit Course</h2>
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
                                <div className="col-md-7">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='card border-0 shadow-lg mb-4'>
                                            <div className='card-body p-4'>
                                                <h4 className="h5 border-bottom pb-3 mb-3">Course Details</h4>

                                                {initialLoading ? (
                                                    <div className="py-4 text-center text-muted">Loading course details...</div>
                                                ) : (
                                                    <>
                                                        <div className="mb-3">
                                                            <label className='form-label' htmlFor='title'>Course Title</label>
                                                            <input
                                                                type='text'
                                                                id='title'
                                                                {...register('title', {
                                                                    required: 'The title field is required.',
                                                                    minLength: { value: 5, message: 'Minimum 5 characters required' }
                                                                })}
                                                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                                placeholder='Title'
                                                            />
                                                            {errors.title && <p className='invalid-feedback'>{errors.title.message}</p>}
                                                        </div>

                                                        <div className='mb-3'>
                                                            <label className='form-label' htmlFor='category'>Category</label>
                                                            <select
                                                                id='category'
                                                                className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                                                                {...register('category_id', {
                                                                    required: 'The category field is required.'
                                                                })}
                                                            >
                                                                <option value="">Select a category</option>
                                                                {categories.map(cat => (
                                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                                ))}
                                                            </select>
                                                            {errors.category_id && <p className='invalid-feedback'>{errors.category_id.message}</p>}
                                                        </div>

                                                        <div className='mb-3'>
                                                            <label className='form-label' htmlFor='level'>Level</label>
                                                            <select
                                                                id='level'
                                                                className={`form-select ${errors.level_id ? 'is-invalid' : ''}`}
                                                                {...register('level_id', {
                                                                    required: 'The level field is required.'
                                                                })}
                                                            >
                                                                <option value="">Select a Level</option>
                                                                {levels.map(lvl => (
                                                                    <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
                                                                ))}
                                                            </select>
                                                            {errors.level_id && <p className='invalid-feedback'>{errors.level_id.message}</p>}
                                                        </div>

                                                        <div className='mb-3'>
                                                            <label className='form-label' htmlFor='language'>Language</label>
                                                            <select
                                                                id='language'
                                                                className={`form-select ${errors.language_id ? 'is-invalid' : ''}`}
                                                                {...register('language_id', {
                                                                    required: 'The language field is required.'
                                                                })}
                                                            >
                                                                <option value="">Select a Language</option>
                                                                {languages.map(lang => (
                                                                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                                                                ))}
                                                            </select>
                                                            {errors.language_id && <p className='invalid-feedback'>{errors.language_id.message}</p>}
                                                        </div>

                                                        <div className='mb-3'>
                                                            <label className='form-label' htmlFor="description">Description</label>
                                                            <textarea
                                                                id="description"
                                                                placeholder='Detailed Course Description'
                                                                rows={4}
                                                                className='form-control'
                                                                {...register('description')}
                                                            ></textarea>
                                                        </div>

                                                        <h4 className="h5 border-bottom pb-2 mt-4 mb-3">Pricing</h4>
                                                        <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                <label className='form-label' htmlFor='sell-price'>Sell Price (PKR / USD)</label>
                                                                <input
                                                                    type='number'
                                                                    step="any"
                                                                    id='sell-price'
                                                                    {...register('sell_price', {
                                                                        required: 'The sell price field is required.'
                                                                    })}
                                                                    className={`form-control ${errors.sell_price ? 'is-invalid' : ''}`}
                                                                    placeholder='Sell Price'
                                                                />
                                                                {errors.sell_price && <p className='invalid-feedback'>{errors.sell_price.message}</p>}
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className='form-label' htmlFor='cross-price'>Cross Price (Strikethrough)</label>
                                                                <input
                                                                    type='number'
                                                                    step="any"
                                                                    id='cross-price'
                                                                    {...register('cross_price')}
                                                                    className='form-control'
                                                                    placeholder='Original Price'
                                                                />
                                                            </div>
                                                        </div>

                                                        <button disabled={loading} type="submit" className='btn btn-primary mt-2 px-4'>
                                                            {loading ? 'Please wait...' : 'Update Course'}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="col-md-5">
                                    <CreateOutcome />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default EditCourse;
