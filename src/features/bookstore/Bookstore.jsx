import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "./bookstoreSlice";
import Modal from "./Modal";

function Bookstore() {
  const bookData = useSelector((state) => state.bookstore.value);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [addEditBook, setAddEditBook] = useState({});
  const [modalType, setModalType] = useState("");

  const emptyBook = {
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
  };

  const handleShowModal = (clickedBook, addOrEdit) => {
    setHideModal(!hideModal);
    setAddEditBook(clickedBook);
    setModalType(addOrEdit);
  };

  const handleDelete = (e, book) => {
    e.stopPropagation();
    dispatch(deleteBook(book));
  };

  return (
    <div className="wrapper">
      <header>
        <button
          className="addButton"
          aria-label="add book"
          onClick={() => handleShowModal(emptyBook, "add")}
        >
          Add Book
        </button>
      </header>
      <h3>Balzesoft BookStore</h3>
      <ul className="bookData-container">
        {bookData.map((book) => (
          <li
            className="book-container"
            key={book.id}
            onClick={() => handleShowModal(book, "edit")}
          >
            <p>{book.name}</p>
            <p>${book.price}</p>
            <p>{book.category}</p>
            <button
              aria-label="delete book"
              onClick={(e) => {
                handleDelete(e, book);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {hideModal ? (
        ""
      ) : (
        <Modal
          addEditBook={addEditBook}
          setHideModal={setHideModal}
          modalType={modalType}
        />
      )}
    </div>
  );
}

export default Bookstore;
