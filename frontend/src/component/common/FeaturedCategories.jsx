import React, { useEffect, useState } from 'react';
import { apiUrl } from './Config';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${apiUrl}/course/meta-data`);
                const result = await res.json();
                if (result.status === 200 && Array.isArray(result.categories)) {
                    setCategories(result.categories.slice(0, 8));
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);

    const defaultCategories = [
        { id: 1, name: 'Web Development' },
        { id: 2, name: 'Mobile Apps' },
        { id: 3, name: 'Data Science & AI' },
        { id: 4, name: 'Cloud & DevOps' },
        { id: 5, name: 'Digital Marketing' },
        { id: 6, name: 'Graphic Design' },
        { id: 7, name: 'UI / UX Design' },
        { id: 8, name: 'Cybersecurity' }
    ];

    const displayList = categories.length > 0 ? categories : defaultCategories;

    return (
        <section className='section-2 my-5'>
            <div className="container">
                <div className='section-title py-3 mt-4'>
                    <h2 className='h3 fw-bold'>Explore Categories</h2>
                    <p className="text-muted">Browse top technology and business skills taught by real-world practitioners.</p>
                </div>
                <div className='row gy-3 mt-2'>
                    {displayList.map(cat => (
                        <div key={cat.id} className='col-6 col-md-6 col-lg-3'>
                            <div className='card shadow-sm border-0 h-100 hover-shadow transition'>
                                <div className='card-body d-flex align-items-center justify-content-center p-3'>
                                    <Link to={`/courses`} className='text-decoration-none fw-semibold text-dark text-center stretched-link'>
                                        {cat.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>      
            </div>
        </section>
    );
};

export default FeaturedCategories;
