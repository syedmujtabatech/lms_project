import React, { useState } from 'react'
import Layout from '../../common/Layout'
import UserSidebar from '../../common/UserSidebar'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl, token } from '../../common/Config'
import toast from 'react-hot-toast'

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const newPassword = watch('new_password')

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.status === 200) {
        toast.success(result.message || 'Password changed successfully!')
        reset()
      } else {
        toast.error(result.message || result.errors?.old_password?.[0] || 'Failed to update password')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong, please try again.')
    }
  }

  return (
    <Layout>
      <section className='section-4'>
        <div className='container pb-5 pt-3'>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/account/dashboard">Account</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Change Password</li>
            </ol>
          </nav>
          <div className='row'>
            <div className='col-md-12 mt-4 mb-3'>
              <div className='d-flex justify-content-between'>
                <h2 className='h4 mb-0 pb-0'>Change Password</h2>
              </div>
            </div>
            <div className='col-lg-3 account-sidebar'>
              <UserSidebar />
            </div>
            <div className='col-lg-9'>
              <div className='card border-0 shadow-lg'>
                <div className='card-body p-4'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                      <label htmlFor='old_password' className='form-label fw-semibold'>Old Password</label>
                      <input
                        type='password'
                        id='old_password'
                        className={`form-control ${errors.old_password ? 'is-invalid' : ''}`}
                        placeholder='Enter current password'
                        {...register('old_password', {
                          required: 'Old password is required'
                        })}
                      />
                      {errors.old_password && (
                        <div className='invalid-feedback'>{errors.old_password.message}</div>
                      )}
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='new_password' className='form-label fw-semibold'>New Password</label>
                      <input
                        type='password'
                        id='new_password'
                        className={`form-control ${errors.new_password ? 'is-invalid' : ''}`}
                        placeholder='Enter new password'
                        {...register('new_password', {
                          required: 'New password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                      />
                      {errors.new_password && (
                        <div className='invalid-feedback'>{errors.new_password.message}</div>
                      )}
                    </div>

                    <div className='mb-4'>
                      <label htmlFor='confirm_password' className='form-label fw-semibold'>Confirm New Password</label>
                      <input
                        type='password'
                        id='confirm_password'
                        className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                        placeholder='Confirm new password'
                        {...register('confirm_password', {
                          required: 'Please confirm your new password',
                          validate: (value) => value === newPassword || 'Passwords do not match'
                        })}
                      />
                      {errors.confirm_password && (
                        <div className='invalid-feedback'>{errors.confirm_password.message}</div>
                      )}
                    </div>

                    <div className='d-flex justify-content-end'>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='btn btn-primary px-4'
                      >
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ChangePassword
