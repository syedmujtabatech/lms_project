import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from '../../common/UserSidebar';
import Layout from '../../common/Layout';
import { apiUrl, getToken, getUser } from '../../common/Config';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        enrolledUsers: 0,
        sales: 0
    });
    const [loading, setLoading] = useState(true);
    const currentUser = getUser();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = getToken();
                const res = await fetch(`${apiUrl}/my-courses`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await res.json();
                if (result.status === 200 && Array.isArray(result.data)) {
                    setStats(prev => ({
                        ...prev,
                        totalCourses: result.data.length
                    }));
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <Layout>
            <section className='section-4'>
                <div className='container pb-5 pt-3'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                    <div className='row'>
                        <div className='col-md-12 mt-4 mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <h2 className='h4 mb-0 pb-0'>Dashboard</h2>
                                    <small className="text-muted">Welcome back, {currentUser?.name || 'Instructor'}!</small>
                                </div>
                                <Link to="/account/course/create" className="btn btn-primary btn-sm">
                                    + Create Course
                                </Link>
                            </div>
                        </div>
                        <div className='col-lg-3 account-sidebar'>
                            <UserSidebar />
                        </div>
                        <div className='col-lg-9'>
                            <div className='row g-4'>
                                <div className='col-md-4'>
                                    <div className='card border-0 shadow-sm rounded-3'>
                                        <div className='card-body p-4'>
                                            <span className='text-muted small text-uppercase fw-bold'>Total Sales</span>
                                            <h2 className='mt-2 fw-bold text-success'>Rs. 0</h2>
                                            <small className="text-muted">Direct enrollments</small>
                                        </div>
                                        <div className='card-footer bg-light border-0 py-2'>
                                            <span className="small text-muted">&nbsp;</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='card border-0 shadow-sm rounded-3'>
                                        <div className='card-body p-4'>
                                            <span className='text-muted small text-uppercase fw-bold'>Enrolled Students</span>
                                            <h2 className='mt-2 fw-bold text-primary'>0</h2>
                                            <small className="text-muted">Active learners</small>
                                        </div>
                                        <div className='card-footer bg-light border-0 py-2'>
                                            <Link to="/account/my-learning" className="small text-decoration-none">
                                                View Learners &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='card border-0 shadow-sm rounded-3'>
                                        <div className='card-body p-4'>
                                            <span className='text-muted small text-uppercase fw-bold'>My Courses</span>
                                            <h2 className='mt-2 fw-bold text-dark'>{loading ? '...' : stats.totalCourses}</h2>
                                            <small className="text-muted">Created in curriculum</small>
                                        </div>
                                        <div className='card-footer bg-light border-0 py-2'>
                                            <Link to="/account/my-courses" className="small text-decoration-none">
                                                Manage Courses &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Dashboard;
