import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

function BooksTable({ books }) {
  return (
    <table className="table table-striped text-center">
      <thead>
        <tr>
          <th className="border">NO</th>
          <th className="border">Title</th>
          <th className="border">Author</th>
          <th className="border">Publish Year</th>
          <th className="border">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books && books.length > 0 ? (
          books.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className="border">{index + 1}</td>
              <td className="border">{book.title}</td>
              <td className="border">{book.author}</td>
              <td className="border">{book.publishYear}</td>
              <td className="border">
                <Link to={`/books/edit/${book._id}`} className="text-primary mx-2">
                  <AiOutlineEdit title="Edit" />
                </Link>
                <Link to={`/books/details/${book._id}`} className="text-info mx-2">
                  <BsInfoCircle title="Details" />
                </Link>
                <Link to={`/books/delete/${book._id}`} className="btn btn-link text-danger mx-2 ">
                  <MdOutlineDelete title="Delete" />
                </Link>
                
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="border text-center">
              No books available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default BooksTable;
