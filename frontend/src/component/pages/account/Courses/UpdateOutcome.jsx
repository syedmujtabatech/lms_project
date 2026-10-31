import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { apiUrl, getToken } from '../../../common/Config';
import toast from 'react-hot-toast';

const UpdateOutcome = ({ handleClose, showOutcome, outcomes, setOutcomes, outcomeData }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!outcomeData) return;
        setLoading(true);
        try {
            const token = getToken();
            const res = await fetch(`${apiUrl}/outcomes/${outcomeData.id}`, {
                method: 'PUT',
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
                const updatedOutcomes = outcomes.map(item =>
                    item.id === outcomeData.id ? { ...item, text: result.data.text } : item
                );
                setOutcomes(updatedOutcomes);
                toast.success(result.message || 'Outcome updated successfully');
                handleClose();
            } else {
                toast.error(result.message || 'Update failed');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating outcome:', error);
            toast.error('Error updating outcome');
        }
    };

    useEffect(() => {
        if (outcomeData) {
            reset({
                outcome: outcomeData.text || ''
            });
        }
    }, [outcomeData, reset]);

    return (
        <Modal show={showOutcome} onHide={handleClose} centered>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title className="h5">Update Outcome</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3'>
                        <label htmlFor="outcomeText" className='form-label'>Outcome Description</label>
                        <input
                            {...register('outcome', {
                                required: 'The outcome field is required.'
                            })}
                            id="outcomeText"
                            type="text"
                            className={`form-control ${errors.outcome ? 'is-invalid' : ''}`}
                            placeholder='Update outcome'
                        />
                        {errors.outcome && (
                            <p className='invalid-feedback'>{errors.outcome.message}</p>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button disabled={loading} type="submit" className='btn btn-primary'>
                        {loading ? 'Please wait...' : 'Save Changes'}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default UpdateOutcome;
