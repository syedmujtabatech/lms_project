import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { apiUrl, getToken } from '../../../common/Config';
import { MdDragIndicator } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import UpdateOutcome from './UpdateOutcome';

const CreateOutcome = () => {
    const [loading, setLoading] = useState(false);
    const [outcomes, setOutcomes] = useState([]);
    const [outcomeData, setOutcomeData] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const params = useParams();
    const [showOutcome, setShowOutcome] = useState(false);

    const handleClose = () => setShowOutcome(false);
    const handleShow = (item) => {
        setOutcomeData(item);
        setShowOutcome(true);
    };

    const fetchOutcomes = async () => {
        try {
            const token = getToken();
            const res = await fetch(`${apiUrl}/outcomes/lists?course_id=${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.status === 200 && Array.isArray(result.data)) {
                setOutcomes(result.data);
            }
        } catch (error) {
            console.error('Error fetching outcomes:', error);
        }
    };

    const deleteOutcome = async (id) => {
        if (!window.confirm('Are you sure you want to delete this outcome?')) {
            return;
        }
        try {
            const token = getToken();
            const res = await fetch(`${apiUrl}/outcomes/destroy/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setOutcomes(prev => prev.filter(item => item.id !== id));
                toast.success(result.message || 'Outcome deleted successfully');
            } else {
                toast.error(result.message || 'Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting outcome:', error);
            toast.error('Error deleting outcome');
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = getToken();
            const formData = { ...data, course_id: params.id };
            const res = await fetch(`${apiUrl}/outcomes/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            setLoading(false);
            if (result.status === 200) {
                fetchOutcomes();
                reset();
                toast.success(result.message || 'Outcome added successfully');
            } else {
                toast.error(result.message || 'Failed to add outcome');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error adding outcome:', error);
            toast.error('Error adding outcome');
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchOutcomes();
        }
    }, [params.id]);

    return (
        <>
            <div className='card shadow-lg border-0'>
                <div className="card-body py-4">
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h4 className='h5 mb-0'>Course Outcomes</h4>
                        <span className="badge bg-secondary">{outcomes.length} Added</span>
                    </div>

                    <form className='mb-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <label className='form-label small text-muted'>What students will learn in this course</label>
                            <input
                                {...register('outcome', {
                                    required: "The outcome field is required."
                                })}
                                type="text"
                                className={`form-control ${errors.outcome ? 'is-invalid' : ''}`}
                                placeholder='e.g. Master React Hooks and State Management'
                            />
                            {errors.outcome && (
                                <p className='invalid-feedback'>{errors.outcome.message}</p>
                            )}

                            <button disabled={loading} type="submit" className='btn btn-primary mt-3'>
                                {loading ? 'Saving...' : 'Add Outcome'}
                            </button>
                        </div>
                    </form>

                    {outcomes.length === 0 ? (
                        <div className="text-muted small text-center py-3 border rounded bg-light">
                            No outcomes added yet. Add at least 3-4 outcomes.
                        </div>
                    ) : (
                        outcomes.map(item => (
                            <div key={item.id} className="card shadow-sm mb-2 border-0 bg-light">
                                <div className='card-body p-2 d-flex align-items-center justify-content-between'>
                                    <div className='d-flex align-items-center'>
                                        <MdDragIndicator className="text-muted me-2" size={18} />
                                        <span className="small">{item.text}</span>
                                    </div>
                                    <div className='d-flex align-items-center ms-2'>
                                        <button
                                            type="button"
                                            onClick={() => handleShow(item)}
                                            className='btn btn-link text-primary p-0 me-2'
                                            title="Edit"
                                        >
                                            <BsPencilSquare size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteOutcome(item.id)}
                                            className="btn btn-link text-danger p-0"
                                            title="Delete"
                                        >
                                            <FaTrash size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <UpdateOutcome
                outcomeData={outcomeData}
                showOutcome={showOutcome}
                handleClose={handleClose}
                outcomes={outcomes}
                setOutcomes={setOutcomes}
            />
        </>
    );
};

export default CreateOutcome;
