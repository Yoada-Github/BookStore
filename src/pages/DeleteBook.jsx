import React from 'react';
import BackButton from '../components/home/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    axios
      .delete(`https://backend-vo93.onrender.com/books/${id}`) // Ensure this matches your backend API
      .then(() => {
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        enqueueSnackbar('Failed to delete book', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button className=" btn btn-primary p-3 bg-blue-600 text-white m-8 w-full rounded-lg shadow-lg hover:bg-blue-1000 transition duration-300 ease-in-out"
                onClick={handleDeleteBook}>
              Yes, Delete it
        </button>

      </div>
    </div>
  );
};

export default DeleteBook;
