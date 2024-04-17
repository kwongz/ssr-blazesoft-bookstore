import { createSlice } from "@reduxjs/toolkit";
import { generateUniqueId } from "./idGenerator";

const booksData = [
  {
    id: generateUniqueId(),
    name: "Book 1",
    price: 10,
    category: "Sci-fi",
    description: "lorem ipsum...",
  },
  {
    id: generateUniqueId(),
    name: "Book 2",
    price: 15,
    category: "Romance",
    description: "Lorem ipsum...",
  },
  {
    id: generateUniqueId(),
    name: "Book 3",
    price: 20,
    category: "History",
    description: "Lorem ipsum...",
  },
  {
    id: generateUniqueId(),
    name: "Book 4",
    price: 5,
    category: "Cooking",
    description: "Lorem ipsum...",
  },
];

export const bookstoreSlice = createSlice({
  name: "bookstore",
  initialState: {
    value: booksData,
  },
  reducers: {
    deleteBook: (state, action) => {
      const bookToDelete = action.payload;
      return {
        ...state,
        value: state.value.filter((book) => book.id !== bookToDelete.id),
      };
    },
    editBook: (state, action) => {
      const editedBook = action.payload;
      const newValue = state.value.map((book) =>
        book.id === editedBook.id ? editedBook : book
      );
      return {
        ...state,
        value: newValue,
      };
    },
    addBook: (state, action) => {
      const addedBook = { ...action.payload, id: generateUniqueId() };
      const newValue = [...state.value];

      return {
        ...state,
        value: [...newValue, addedBook],
      };
    },
  },
});

export const { addBook, deleteBook, editBook } = bookstoreSlice.actions;

export default bookstoreSlice.reducer;
