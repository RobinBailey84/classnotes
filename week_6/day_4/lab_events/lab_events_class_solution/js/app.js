document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');
  const form = document.querySelector('#new-item-form');

  const deleteButton = document.querySelector('#delete-all-button');

  const handleDeleteButton = function(event){
    const readingList = document.querySelector('#reading-list');
    readingList.innerHTML = '';
  }

  deleteButton.addEventListener('click', handleDeleteButton);



  const addElement = function(type){
    return document.createElement(type);
  }


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const category = event.target.category.value;

    const readingList = document.querySelector('#reading-list');

    const bookDetails = addElement('div');
    const titlePara = addElement('p');
    const authorPara = addElement('p');
    const categoryPara = addElement('p');

    titlePara.textContent = title;
    authorPara.textContent = author;
    categoryPara.textContent = category;

    bookDetails.appendChild(titlePara);
    bookDetails.appendChild(authorPara);
    bookDetails.appendChild(categoryPara);

    readingList.appendChild(bookDetails);

    form.reset();
  }

  form.addEventListener('submit', handleFormSubmit);
})
