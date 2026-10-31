import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { Rating } from 'react-simple-star-rating';
import { Accordion, Badge, ListGroup, Card } from "react-bootstrap";
import { Link, useSearchParams } from 'react-router-dom';
import { apiUrl } from '../common/Config';

const Details = () => {
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get('id') || 1;
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5.0);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${apiUrl}/course/show/${courseId}`);
                const result = await res.json();
                if (result.status === 200 && result.data) {
                    setCourse(result.data);
                }
            } catch (err) {
                console.error('Error fetching course details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [courseId]);

    const title = course?.title || 'Master Modern Web Development with React & Laravel';
    const categoryName = course?.category?.name || 'Full-Stack Development';
    const levelName = course?.level?.name || 'Intermediate';
    const languageName = course?.language?.name || 'English / Urdu';
    const sellPrice = course?.sell_price ? `Rs. ${course.sell_price}` : 'Rs. 4,999';
    const crossPrice = course?.cross_price ? `Rs. ${course.cross_price}` : 'Rs. 9,999';
    const description = course?.description || 'Learn to build complete modern full-stack web applications from scratch using Laravel RESTful API and React single-page frontend. This comprehensive curriculum covers authentication, database modeling, REST architecture, state management, and production deployment.';
    const outcomes = (course?.outcomes && course.outcomes.length > 0) ? course.outcomes : [
        { id: 1, text: 'Build production-ready REST APIs using Laravel 11 and Sanctum' },
        { id: 2, text: 'Create modern, reactive SPAs using React 19 and React Router' },
        { id: 3, text: 'Design scalable relational database schemas with MySQL migrations' },
        { id: 4, text: 'Master real-world authentication, authorization and role permissions' }
    ];

    return (
        <Layout>
            <div className='container pb-5 pt-3'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2 text-muted">Loading course details...</p>
                    </div>
                ) : (
                    <div className='row my-4'>
                        <div className='col-lg-8'>
                            <h1 className='h2 fw-bold text-dark'>{title}</h1>
                            <div className='d-flex align-items-center mt-2'>
                                <span className="badge bg-primary me-3">{categoryName}</span>
                                <div className='d-flex align-items-center'>
                                    <span className="fw-bold text-warning me-1">5.0</span>
                                    <Rating initialValue={rating} size={18} readonly />
                                    <span className="text-muted ms-2 small">(120 ratings)</span>
                                </div>
                            </div>

                            <div className="row mt-4 p-3 bg-light rounded-3 text-center g-2">
                                <div className="col-4">
                                    <span className="text-muted d-block small">LEVEL</span>
                                    <span className="fw-bold">{levelName}</span>
                                </div>
                                <div className="col-4 border-start border-end">
                                    <span className="text-muted d-block small">STUDENTS</span>
                                    <span className="fw-bold">1,250+</span>
                                </div>
                                <div className="col-4">
                                    <span className="text-muted d-block small">LANGUAGE</span>
                                    <span className="fw-bold">{languageName}</span>
                                </div>
                            </div>

                            <div className='row'>
                                {/* Overview */}
                                <div className='col-md-12 mt-4'>
                                    <div className='border bg-white rounded-3 p-4 shadow-sm'>
                                        <h3 className='mb-3 h5 fw-bold'>Course Overview</h3>
                                        <p className="text-secondary" style={{ whiteSpace: 'pre-line' }}>{description}</p>
                                    </div>
                                </div>

                                {/* Outcomes */}
                                <div className='col-md-12 mt-4'>
                                    <div className='border bg-white rounded-3 p-4 shadow-sm'>
                                        <h3 className='mb-3 h5 fw-bold'>What You Will Learn</h3>
                                        <ul className="list-unstyled mt-3 mb-0">
                                            {outcomes.map(item => (
                                                <li key={item.id} className="d-flex align-items-start mb-2">
                                                    <span className="text-success me-2 fw-bold">&#10003;</span>
                                                    <span>{item.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Course Structure */}
                                <div className='col-md-12 mt-4'>
                                    <div className='border bg-white rounded-3 p-4 shadow-sm'>
                                        <h3 className="h5 fw-bold mb-3">Course Curriculum</h3>
                                        <Accordion defaultActiveKey="0" id="courseAccordion">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>
                                                    Module 1: Getting Started & Foundations
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                            <span>1. Course Introduction and Architecture Overview</span>
                                                            <Badge bg="primary">Free Preview</Badge>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                            <span>2. Development Environment Setup (PHP 8.2, Composer, Node)</span>
                                                            <span className="text-muted small">15 mins</span>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>
                                                    Module 2: Building the API Backend (Laravel 11)
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                            <span>3. Database Design, Migrations & Eloquent Relations</span>
                                                            <span className="text-muted small">30 mins</span>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                            <span>4. Sanctum Authentication & Controller Endpoints</span>
                                                            <span className="text-muted small">45 mins</span>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>
                                                    Module 3: Frontend Single Page Application (React)
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                            <span>5. Context API, Authentication State & Protected Routes</span>
                                                            <span className="text-muted small">40 mins</span>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                            <span>6. Dynamic Forms, Course Creator & Live Validation</span>
                                                            <span className="text-muted small">50 mins</span>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buy Box */}
                        <div className='col-lg-4 mt-4 mt-lg-0'>
                            <div className='border rounded-3 bg-white p-4 shadow-sm sticky-top' style={{ top: '90px' }}>
                                <div className="card-img-top mb-3">
                                    <img 
                                        src={`https://placehold.co/600x350/0f172a/ffffff?text=${encodeURIComponent(title.substring(0, 20))}`} 
                                        alt={title} 
                                        className="img-fluid rounded" 
                                    />
                                </div>
                                <div className="d-flex align-items-baseline mb-2">
                                    <h3 className="fw-bold text-success mb-0 me-3">{sellPrice}</h3>
                                    {crossPrice && (
                                        <span className="text-muted text-decoration-line-through small">{crossPrice}</span>
                                    )}
                                </div>

                                <div className="mt-3">
                                    <Link to="/account/watch-course" className="btn btn-primary w-100 py-2 fw-bold">
                                        Enroll Now
                                    </Link>
                                    <Link to="/courses" className="btn btn-outline-secondary w-100 py-2 mt-2">
                                        Browse More Courses
                                    </Link>
                                </div>

                                <div className='mt-4 pt-3 border-top'>
                                    <h6 className="fw-bold mb-2">This course includes:</h6>
                                    <ListGroup variant="flush" className="small">
                                        <ListGroup.Item className='ps-0 border-0 py-1'>
                                            <span className="text-primary me-2">&bull;</span> Full lifetime access
                                        </ListGroup.Item>
                                        <ListGroup.Item className='ps-0 border-0 py-1'>
                                            <span className="text-primary me-2">&bull;</span> Access on mobile and web
                                        </ListGroup.Item>
                                        <ListGroup.Item className='ps-0 border-0 py-1'>
                                            <span className="text-primary me-2">&bull;</span> Certificate of completion
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Details;
