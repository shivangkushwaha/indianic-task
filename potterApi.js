const axios = require('axios');

const API_BASE_URL = 'https://api.potterdb.com/v1';

async function getBooks() {
  try {
    //  API calling for the get all chapters list
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than success 
      throw new Error(`Error fetching books: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error('Error fetching books: No response received from the API');
    } else {
      // Something happened in setting up the request
      throw new Error(`Error fetching books: ${error.message}`);
    }
  }
}

async function getBookChapters(bookId) {
  try {
    // Calling api for get chapters
    const response = await axios.get(`${API_BASE_URL}/books/${bookId}/chapters`);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(`Error fetching chapters for book ID ${bookId}: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error(`Error fetching chapters for book ID ${bookId}: No response received from the API`);
    } else {
      // Something happened in setting up the request
      throw new Error(`Error fetching chapters for book ID ${bookId}: ${error.message}`);
    }
  }
}

async function getLastChapterSummary() {
  try {
    const books = await getBooks();
    if (books.length === 0) {
      throw new Error('No books found');
    }
    const firstBook = books[0];
    const chapters = await getBookChapters(firstBook.id);
    if (chapters.length === 0) {
      throw new Error('No chapters found for the first book');
    }
    const lastChapter = chapters[chapters.length - 1];
    return lastChapter.attributes.summary;
  } catch (error) {
    throw new Error(`Unable to fetch data from the Harry Potter API: ${error.message}`);
  }
}

module.exports = {
  getLastChapterSummary
};

