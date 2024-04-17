import { createSlice } from "@reduxjs/toolkit";

const booksData = [
  {
    name: "The Hitchhiker's Guide to the Galaxy",
    price: 12.99,
    category: "Sci-fi",
    description: "A comedic science fiction series by Douglas Adams.",
  },
  {
    name: "Pride and Prejudice",
    price: 9.99,
    category: "Romance",
    description: "A classic romantic novel by Jane Austen.",
  },
  {
    name: "Sapiens: A Brief History of Humankind",
    price: 17.5,
    category: "History",
    description: "A popular science book by Yuval Noah Harari.",
  },
  {
    name: "The Joy of Cooking",
    price: 24.95,
    category: "Cooking",
    description: "A classic cookbook by Irma S. Rombauer.",
  },
];

export const bookstoreSlice = createSlice({
  name: "bookstore",
  initialState: {
    value: booksData,
  },
  reducers: {
    deleteBook: (state, action) => {
      const bookToDeleteIndex = action.payload;
      console.log(bookToDeleteIndex);
      return {
        ...state,
        value: state.value.filter((book, index) => index !== bookToDeleteIndex),
      };
    },
    editBook: (state, action) => {
      const editedBook = action.payload.newBook;
      const bookIndex = action.payload.modalBookIndex;
      console.log(bookIndex);
      const newValue = state.value.map((book, index) =>
        index === bookIndex ? editedBook : book
      );
      return {
        ...state,
        value: newValue,
      };
    },
    addBook: (state, action) => {
      const addedBook = action.payload;
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
