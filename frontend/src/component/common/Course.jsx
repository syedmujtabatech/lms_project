import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course, title, level, enrolled, price, customClasses = "col-lg-4 col-md-6" }) => {
    // Support either object prop or individual props
    const courseTitle = course?.title || title || 'Untitled Course';
    const courseLevel = course?.level?.name || level || 'All Levels';
    const courseEnrolled = course?.enrolled_count || enrolled || '12';
    const coursePrice = course?.sell_price ? `Rs. ${course.sell_price}` : (price || 'Rs. 4,999');
    const courseCategory = course?.category?.name || 'Programming';
    const courseId = course?.id || 1;

    return (
        <div className={customClasses}>
            <div className='card border-0 shadow-sm h-100 course-card'>
                <div className='card-img-top position-relative'>
                    <img 
                        src={`https://placehold.co/600x350/0f172a/ffffff?text=${encodeURIComponent(courseTitle.substring(0, 24))}`} 
                        alt={courseTitle} 
                        className='img-fluid rounded-top w-100'
                        style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                        {courseCategory}
                    </span>
                </div>
                <div className='card-body d-flex flex-column'>
                    <h5 className="card-title h6 text-truncate" title={courseTitle}>
                        {courseTitle}
                    </h5>
                    <div className="meta d-flex py-2 small text-muted">
                        <div className="level">
                            <div className="d-flex align-items-center">
                                <span className="badge bg-light text-secondary border">{courseLevel}</span>
                            </div>
                        </div>
                        <div className="student ps-3">
                            <div className="d-flex align-items-center">
                                <span className="text-muted">{courseEnrolled} students</span>
                            </div>
                        </div>
                        <div className="rating ms-auto">
                            <span className="text-warning">&#9733; 5.0</span>
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-white border-top-0 pt-0 pb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="price fw-bold text-primary">{coursePrice}</div>
                        <Link to={`/detail?id=${courseId}`} className="btn btn-outline-primary btn-sm">
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
