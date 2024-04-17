import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "./bookstoreSlice";
import Modal, { MODAL_MODES } from "./Modal";

function Bookstore() {
  const bookData = useSelector((state) => state.bookstore.value);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [addEditBook, setAddEditBook] = useState({});
  const [modalType, setModalType] = useState("");
  const [modalBookIndex, setModalBookIndex] = useState("");

  const emptyBook = {
    name: "",
    price: "",
    category: "",
    description: "",
  };

  const handleShowModal = (clickedBook, addOrEdit, index) => {
    setHideModal(!hideModal);
    setAddEditBook(clickedBook);
    setModalType(addOrEdit);
    if (index) {
      setModalBookIndex(index);
    }
  };

  const handleDelete = (e, index) => {
    e.stopPropagation();
    dispatch(deleteBook(index));
  };

  return (
    <>
      <header>
        <h1>Blazesoft BookStore</h1>
      </header>
      <div className="wrapper">
        <button
          className="addButton"
          aria-label="add book"
          onClick={() => handleShowModal(emptyBook, MODAL_MODES.ADD)}
        >
          Add Book
        </button>
        <ul className="bookData-container">
          {bookData.map((book, index) => (
            <li
              className="book-container"
              key={index}
              onClick={() => handleShowModal(book, MODAL_MODES.EDIT, index)}
            >
              <div className="details">
                <p>{book.category}</p>
                <p>${book.price}</p>
                <h4>{book.name}</h4>
              </div>
              <button
                aria-label="delete book"
                onClick={(e) => {
                  handleDelete(e, index);
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
            modalBookIndex={modalBookIndex}
          />
        )}
      </div>
    </>
  );
}

export default Bookstore;
