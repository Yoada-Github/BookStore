import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    // console.log(userId)
    axios
      .get(`https://backend-vo93.onrender.com/books/${userId}`)
      .then((response) => {
        setBooks(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books. Please try again later.');
      });
      
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl'>Books List</h1>
        <div className='flex items-center gap-4'>
          <Link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4x1 fs-1' />
          </Link>
          <span>Welcome {localStorage.getItem('user')}!</span>
          <button className='btn btn-primary p-1' onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
      <BooksTable books={books} />

    </div>
  );
};

export default Home;
