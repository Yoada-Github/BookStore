import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function CreateBooks() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleSaveBook = () => {
    const userId = localStorage.getItem("userId")
    const data = {
      title,
      author,
      publishYear,
      userId: userId
    };

    axios
      .post(`https://backend-vo93.onrender.com/book/`,  data) 
      .then(() => {
        enqueueSnackbar('Book created successfully', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        enqueueSnackbar('Failed to create book', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="my-4">Create Book</h1>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-4">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mx-5 px-4 py-2"
            placeholder="Enter book title"
          />
        </div>
        <div className="my-4">
          <label className="mx-4">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mx-4 px-4 py-2"
            placeholder="Enter author name"
          />
        </div>
        <div className="my-4">
          <label className="mx-1">Publish Year:</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="mx-4 px-4 py-2"
            placeholder="Enter publish year"
          />
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateBooks;
