import { useState } from 'react';
import api from '../services/api';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!/.+@.+\..+/.test(email)) return 'Invalid email';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    try {
      await api.post('/auth/signin', { email, password });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signin failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
        {error && <div className='text-red-500 mb-4'>{error}</div>}
        <input
          className='w-full p-2 mb-4 border rounded'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='w-full p-2 mb-4 border rounded'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>
          Sign In
        </button>
      </form>
    </div>
  );
}
