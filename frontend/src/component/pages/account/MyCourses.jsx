import React, { useEffect, useState } from 'react';
import EditCourse from '../../common/EditCourse';
import UserSidebar from '../../common/UserSidebar';
import { Link } from 'react-router-dom';
import Layout from '../../common/Layout';
import { apiUrl, getToken } from '../../common/Config';
import toast from 'react-hot-toast';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyCourses = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const res = await fetch(`${apiUrl}/my-courses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.status === 200 && Array.isArray(result.data)) {
                setCourses(result.data);
            }
        } catch (error) {
            console.error('Error fetching my courses:', error);
            toast.error('Failed to load courses');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm('Are you sure you want to delete this course?')) {
            return;
        }
        try {
            const token = getToken();
            const res = await fetch(`${apiUrl}/course/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setCourses(prev => prev.filter(c => c.id !== id));
                toast.success(result.message || 'Course deleted');
            } else {
                toast.error(result.message || 'Could not delete course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Error deleting course');
        }
    };

    useEffect(() => {
        fetchMyCourses();
    }, []);

    return (
        <Layout>
            <section className='section-4'>
                <div className='container pb-5 pt-3'>
                    <div className='row'>
                        <div className='col-md-12 mt-4 mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h2 className='h4 mb-0 pb-0'>My Courses</h2>
                                <Link to="/account/course/create" className='btn btn-primary'>
                                    + Create New Course
                                </Link>
                            </div>
                        </div>

                        <div className='col-lg-3 account-sidebar'>
                            <UserSidebar />
                        </div>

                        <div className='col-lg-9'>
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status"></div>
                                    <p className="mt-2 text-muted">Loading your courses...</p>
                                </div>
                            ) : courses.length === 0 ? (
                                <div className="card border-0 shadow-sm text-center p-5">
                                    <div className="card-body">
                                        <h4 className="h5 text-muted mb-3">You haven't created any courses yet</h4>
                                        <p className="text-muted mb-4">Start sharing your knowledge by creating your first course today.</p>
                                        <Link to="/account/course/create" className="btn btn-primary">
                                            Create Your First Course
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className='row gy-4'>
                                    {courses.map(course => (
                                        <EditCourse 
                                            key={course.id} 
                                            course={course} 
                                            onDelete={handleDeleteCourse} 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default MyCourses;
