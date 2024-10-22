import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './Form.css'; 

const Register = () => {
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    userType: yup.string().required('User type is required'),
    gender: yup.string().required('Gender is required'),
    age: yup.number().positive('Age must be a positive number').required('Age is required'),
    phone: yup.string().required('Phone number is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
  
    console.log("Submitting data:", data); // Log data
  
    try {
      const response = await axios.post('users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User registered successfully:', response.data);
    } catch (error) {
      console.error('Registration error:', error.response.data); // Log error response data
    }
  };
  

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>First Name:</label>
          <input {...register('firstName')} />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input {...register('lastName')} />
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <input {...register('userType')} />
          {errors.userType && <p className="error">{errors.userType.message}</p>}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input {...register('gender')} />
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" {...register('age')} />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input {...register('phone')} />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
