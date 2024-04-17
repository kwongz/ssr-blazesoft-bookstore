import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editBook, addBook } from "./bookstoreSlice";

export const MODAL_MODES = {
  ADD: "add",
  EDIT: "edit",
};

const Modal = ({ addEditBook, setHideModal, modalType, modalBookIndex }) => {
  console.log(modalBookIndex);
  const dispatch = useDispatch();

  //create state to store new book object
  const [newBook, setNewBook] = useState(addEditBook);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewBook({
      ...newBook,
      [e.target.name]: value,
    });
  };

  //handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    setHideModal(true);
    if (modalType === MODAL_MODES.EDIT) {
      const payload = { newBook, modalBookIndex };
      dispatch(editBook(payload));
    } else if (modalType === MODAL_MODES.ADD) {
      dispatch(addBook(newBook));
    }
  };

  const capitalizedStr =
    modalType.slice(0, 1).toUpperCase() + modalType.slice(1);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2>{capitalizedStr} Book Details</h2>
        <form className="modalForm" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">
              <span>Name:</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newBook.name}
              onChange={handleChange}
              required
            ></input>
          </div>

          <div className="input-container">
            <label htmlFor="price">
              <span>Price:</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newBook.price}
              onChange={handleChange}
              required
            ></input>
          </div>

          <div className="input-container">
            <label htmlFor="category">
              <span>Category:</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={newBook.category}
              onChange={handleChange}
              required
            ></input>
          </div>

          <div className="input-container">
            <label htmlFor="description">
              <span>Description:</span>
            </label>
            <textarea
              type="textarea"
              id="description"
              name="description"
              value={newBook.description}
              onChange={handleChange}
              required
              rows="7"
            ></textarea>
          </div>
          <div className="button-container">
            <button className="submit">Submit</button>
            <button
              onClick={() => {
                setHideModal(true);
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
