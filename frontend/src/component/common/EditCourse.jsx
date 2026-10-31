import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

const EditCourse = ({ course, onDelete }) => {
    if (!course) return null;

    const title = course.title || 'Untitled Course';
    const levelName = course.level ? course.level.name : 'All Levels';
    const categoryName = course.category ? course.category.name : 'General';
    const price = course.sell_price ? `Rs. ${course.sell_price}` : (course.price ? `Rs. ${course.price}` : 'Free');

    return (
        <div className="col-md-4 mb-4">
            <div className='card border-0 shadow-sm h-100'>
                <div className='card-img-top position-relative'>
                    <img 
                        src={`https://placehold.co/600x350/1e293b/ffffff?text=${encodeURIComponent(title.substring(0, 24))}`} 
                        alt={title} 
                        className='img-fluid rounded-top w-100' 
                        style={{ height: '170px', objectFit: 'cover' }}
                    />
                    <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                        {categoryName}
                    </span>
                </div>
                <div className='card-body d-flex flex-column'>
                    <h5 className="card-title text-truncate" title={title}>
                        {title}
                    </h5>
                    <div className="meta d-flex py-2 small text-muted">
                        <div className="level me-3">
                            <span className="badge bg-light text-dark border">{levelName}</span>
                        </div>
                        <div className="price ms-auto fw-bold text-success">
                            {price}
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-white border-top-0 pt-0 pb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/account/course/edit/${course.id}`} className="btn btn-primary btn-sm">
                            <FaEdit className="me-1" /> Edit Course
                        </Link>
                        {onDelete && (
                            <button 
                                type="button" 
                                onClick={() => onDelete(course.id)} 
                                className="btn btn-outline-danger btn-sm"
                                title="Delete Course"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCourse;
