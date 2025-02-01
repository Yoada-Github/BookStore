import React, { useState, useEffect } from 'react';
import BackButton from '../components/home/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.get(`https://backend-vo93.onrender.com/book/books/edit/${id}`, {params: {userId: userId}});
      const { title, author, publishYear } = response.data;

      console.log(response)
      if (title && author && publishYear) {
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
      } else {
        throw new Error('Incomplete book data received.');
      }
    } catch (err) {
      console.error('Failed to fetch book details:', err.message);
      console.log(err)
      setError('Failed to load book details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
   
    fetchBookDetails();
  }, [id]);

  const handleEditBook = async () => {
    const data = { title, author, publishYear };

    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      await axios.put(`https://backend-vo93.onrender.com/book/books/${id}`, data);
      alert('Book updated successfully!');
      navigate('/home');
    } catch (err) {
      console.error('Failed to update book:', err.message);
      setError('Failed to update the book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>

      {error && (
        <p className="text-red-600 text-center mb-4">
          {error}
        </p>
      )}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="my-4">
              <label className="text-xl text-gray-500 block mb-2 p-4 m-4 fs-2">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
              />
            </div>

            <div className="my-4">
              <label className="text-xl text-gray-500 block mb-2 m-3 p-3 fs-2">Author:</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
              />
            </div>

            <div className="my-4">
              <label className="text-xl text-gray-500 block mb-2 m-1 p-1 fs-3">Publish Year:</label>
              <input
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
              />
            </div>

            <button
              className=" btn btn-primary p-3 text-white rounded-md hover:bg-sky-700 w-full"
              onClick={handleEditBook}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditBook;
