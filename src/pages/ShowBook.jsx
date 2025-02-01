import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/home/BackButton'; 
import axios from 'axios';

function ShowBook() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {

    // Fetch the book data from the API
   axios
      .get(`https://backend-vo93.onrender.com/book/books/details/${id}`)
      .then((response) => {
        console.log('Book Data:', response.data); // Log the book data
        setBook(response.data);
        setLoading(false);
        
              })
      .catch((error) => {
        console.error('Error fetching the book:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading book details...</div>;
  }

  if (!book) {
    return (
      <div className="p-4">
        <BackButton />
        <h1 className="my-4">Book Not Found</h1>
        <p>Sorry, we couldn't find the book you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-secondary m-5 ">
      <BackButton />
      <h1 className="my-5 text-white">Show Book</h1>
      <div className=" w-100 rounded-xl p-4 bg-secondary text-white">
        <div className="my-4 text-start ">
          <span className="border p-3 rounded mx-2 font-bold bg-secondary">ID</span>
          <span className="p-4 fs-5">:{id}</span>
        </div>
        <div className="my-5 text-start ">
          <span className="border p-3 rounded font-bold bg-secondary">Title</span>
          <span className=" mx-2 p-3 fs-5">: {book.title}</span>
        </div>
        <div className="my-4 text-start ">
          <span className=" border p-3 rounded font-bold bg-secondary">Author</span>
          <span className=" m-2 fs-4">: {book.author}</span>
        </div>
        <div className="my-5 text-start">
          <span className="border p-3 rounded font-bold bg-secondary">Publish Year</span>
          <span className="fs-4 m-1"> : {book.publishYear}</span>
        </div>
      </div>
    </div>
  );
}

export default ShowBook;
