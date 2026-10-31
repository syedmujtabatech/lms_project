import React, { useEffect, useState } from 'react';
import Course from "./Course";
import { apiUrl } from "./Config";
import { Link } from "react-router-dom";

const FeaturedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`${apiUrl}/courses`);
                const result = await res.json();
                if (result.status === 200 && Array.isArray(result.data)) {
                    setCourses(result.data.slice(0, 8));
                }
            } catch (err) {
                console.error('Error fetching featured courses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <section className='section-3 my-5'>
            <div className="container">
                <div className='section-title py-3 mt-4 d-flex justify-content-between align-items-end'>
                    <div>
                        <h2 className='h3 fw-bold'>Featured Courses</h2>
                        <p className="text-muted mb-0">Discover top-rated courses designed by expert instructors to level up your career.</p>
                    </div>
                    <Link to="/courses" className="btn btn-outline-primary btn-sm d-none d-md-inline-block">
                        View All Courses &rarr;
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-4 text-muted">No courses available yet.</div>
                ) : (
                    <div className="row gy-4 mt-2">
                        {courses.map(course => (
                            <Course 
                                key={course.id}
                                course={course}
                                customClasses="col-lg-3 col-md-6"
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedCourses;
