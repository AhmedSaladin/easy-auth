export default function Home() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const err = validate();
    // if (err) return setError(err);
    // try {
    //   await api.post('/auth/signup', { email, name, password });
    // } catch (err: any) {
    //   setError(err.response?.data?.message || 'Signup failed');
    // }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>Home</h2>
        <div className='text-500 mb-4'>Hello there!!!</div>
        <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>
          Log out
        </button>
      </form>
    </div>
  );
}
