import React, { useEffect, useState, useMemo } from 'react';
import Course from '../common/Course';
import Layout from '../common/Layout';
import { apiUrl } from '../common/Config';
import { Link } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [levels, setLevels] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchCatalogData = async () => {
            setLoading(true);
            try {
                const [coursesRes, metaRes] = await Promise.all([
                    fetch(`${apiUrl}/courses`),
                    fetch(`${apiUrl}/course/meta-data`)
                ]);
                const coursesData = await coursesRes.json();
                const metaData = await metaRes.json();

                if (coursesData.status === 200 && Array.isArray(coursesData.data)) {
                    setCourses(coursesData.data);
                }
                if (metaData.status === 200) {
                    setCategories(metaData.categories || []);
                    setLevels(metaData.levels || []);
                    setLanguages(metaData.languages || []);
                }
            } catch (err) {
                console.error('Error fetching courses catalog:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalogData();
    }, []);

    const toggleFilter = (list, setList, id) => {
        if (list.includes(id)) {
            setList(list.filter(item => item !== id));
        } else {
            setList([...list, id]);
        }
    };

    const clearAllFilters = (e) => {
        if (e) e.preventDefault();
        setSearchKeyword('');
        setSelectedCategories([]);
        setSelectedLevels([]);
        setSelectedLanguages([]);
        setSortBy('newest');
    };

    // Filtered courses
    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            // Keyword match
            if (searchKeyword.trim() !== '') {
                const kw = searchKeyword.toLowerCase();
                const titleMatch = course.title?.toLowerCase().includes(kw);
                const descMatch = course.description?.toLowerCase().includes(kw);
                if (!titleMatch && !descMatch) return false;
            }

            // Category match
            if (selectedCategories.length > 0) {
                if (!selectedCategories.includes(course.category_id)) return false;
            }

            // Level match
            if (selectedLevels.length > 0) {
                if (!selectedLevels.includes(course.level_id)) return false;
            }

            // Language match
            if (selectedLanguages.length > 0) {
                if (!selectedLanguages.includes(course.language_id)) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'newest') {
                return (b.id || 0) - (a.id || 0);
            } else if (sortBy === 'oldest') {
                return (a.id || 0) - (b.id || 0);
            } else if (sortBy === 'price-low') {
                return (parseFloat(a.sell_price) || 0) - (parseFloat(b.sell_price) || 0);
            } else if (sortBy === 'price-high') {
                return (parseFloat(b.sell_price) || 0) - (parseFloat(a.sell_price) || 0);
            }
            return 0;
        });
    }, [courses, searchKeyword, selectedCategories, selectedLevels, selectedLanguages, sortBy]);

    return (
        <Layout>
            <div className='container pb-5 pt-3'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Courses Catalog</li>
                    </ol>
                </nav>

                <div className='row'>
                    {/* Filters Sidebar */}
                    <div className='col-lg-3'>
                        <div className='sidebar mb-5 card border-0 shadow-sm'>
                            <div className='card-body'>
                                <div className="mb-3">
                                    <label className="form-label fw-bold small text-muted">SEARCH COURSES</label>
                                    <input 
                                        type="text" 
                                        className='form-control' 
                                        placeholder='Search by keyword...'
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className='pt-2 mb-3'>
                                    <h3 className='h6 fw-bold border-bottom pb-2 mb-2'>Categories</h3>
                                    <ul className='list-unstyled mb-0'>
                                        {categories.map(cat => (
                                            <li key={cat.id} className="py-1">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        id={`cat-${cat.id}`}
                                                        checked={selectedCategories.includes(cat.id)}
                                                        onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat.id)}
                                                    />
                                                    <label className="form-check-label small" htmlFor={`cat-${cat.id}`}>
                                                        {cat.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Level Filter */}
                                <div className='mb-3'>
                                    <h3 className='h6 fw-bold border-bottom pb-2 mb-2'>Level</h3>
                                    <ul className='list-unstyled mb-0'>
                                        {levels.map(lvl => (
                                            <li key={lvl.id} className="py-1">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        id={`lvl-${lvl.id}`}
                                                        checked={selectedLevels.includes(lvl.id)}
                                                        onChange={() => toggleFilter(selectedLevels, setSelectedLevels, lvl.id)}
                                                    />
                                                    <label className="form-check-label small" htmlFor={`lvl-${lvl.id}`}>
                                                        {lvl.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Language Filter */}
                                <div className='mb-3'>
                                    <h3 className='h6 fw-bold border-bottom pb-2 mb-2'>Language</h3>
                                    <ul className='list-unstyled mb-0'>
                                        {languages.map(lang => (
                                            <li key={lang.id} className="py-1">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        id={`lang-${lang.id}`}
                                                        checked={selectedLanguages.includes(lang.id)}
                                                        onChange={() => toggleFilter(selectedLanguages, setSelectedLanguages, lang.id)}
                                                    />
                                                    <label className="form-check-label small" htmlFor={`lang-${lang.id}`}>
                                                        {lang.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button 
                                    onClick={clearAllFilters} 
                                    className='btn btn-outline-secondary btn-sm w-100 mt-2'
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Course Listing Column */}
                    <div className='col-lg-9'>
                        <section className='section-3'>
                            <div className='d-flex justify-content-between mb-4 align-items-center'>
                                <div className='h6 mb-0 text-muted'>
                                    Showing <strong className="text-dark">{filteredCourses.length}</strong> courses
                                </div>    
                                <div className="d-flex align-items-center">
                                    <span className="me-2 small text-muted">Sort:</span>
                                    <select 
                                        className='form-select form-select-sm'
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        style={{ width: '150px' }}
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                </div>
                            </div> 

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status"></div>
                                    <p className="mt-2 text-muted">Loading courses from API...</p>
                                </div>
                            ) : filteredCourses.length === 0 ? (
                                <div className="card border-0 shadow-sm text-center p-5">
                                    <h5 className="text-muted">No courses found matching your criteria</h5>
                                    <p className="text-muted small">Try clearing filters or searching with different terms.</p>
                                    <div>
                                        <button onClick={clearAllFilters} className="btn btn-primary btn-sm">
                                            Reset Filters
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="row gy-4">   
                                    {filteredCourses.map(course => (
                                        <Course 
                                            key={course.id}
                                            course={course}
                                            customClasses="col-lg-4 col-md-6"
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Courses;
