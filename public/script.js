const bookReviewCard = async () => {
  try {
    const response = await fetch('http://localhost:3000/bookreviews');
    const bookData = await response.json();

    const markup = bookData.map(book => {
      return `<div class="review-card">
      <img src="/server/uploads/${book.src}" alt="bookimg" class="book-img">
      <h2>${book.title}</h2>
      <p>${book.summary}</p>
      <p><span>${book.writer}</span><span class="date">${book.date}</span></p>
        </div>`
    })
    const books = markup.join(" ");
    
    const container = document.querySelector('.review-container');

    container.innerHTML = books;

  } catch(error) {
    console.error("Error fetching reviews:", error);
  }
}

// const formData = document.getElementById('form');

//  formData.addEventListener("submit", async (e) => {
//   await bookReviewCard()
//  window.location.reload()
// });
// const submission = async (e) => {
//    await bookReviewCard()
//    window.location.reload()
//   };

window.addEventListener("DOMContentLoaded", bookReviewCard);
 
 