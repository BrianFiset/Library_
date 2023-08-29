const modalBtn = document.querySelector('.add-book');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submit-btn');
const bookContainer = document.querySelector('.container');
const myLibrary = [
    {
        title: 'A Mind For Numbers: How to Excel at Math and Science',
        author: 'Barbara Oakley',
        pages: 332,
        read: 'Not read Yet'
    }
];

modalBtn.addEventListener('click', toggleModal);
closeModal.addEventListener('click', toggleModal);
modal.addEventListener('click', (e) => {
    e.stopPropagation();
    if(e.target === modal){
        toggleModal();
    };
})

function toggleModal(){
    modal.classList.toggle('active');
}

function createBook() {
    const book = createDiv('book');
    const title = document.querySelector('#book-name');
    const author = document.querySelector('#author-name');
    const pages = document.querySelector('#book-pages');
    const read = document.querySelector('#read-status');
    book.appendChild(createDiv('title' , title.value));
    book.appendChild(createDiv('author' , author.value));
    book.appendChild(createDiv('pages' , pages.value));
    book.appendChild(createDiv('read' , read.options[read.selectedIndex].text));
    bookContainer.appendChild(book);
    toggleModal();
}

function Book(){
    this.title = document.querySelector('#book-name').value;
    this.author = document.querySelector('#author-name').value;
    this.pages = document.querySelector('#book-pages').value;
    this.read = document.querySelector('#read-status').value;
}

function addBookToLibrary(){
    myLibrary.push(new Book());
}

function displayBooks(){
    for(let i = 0 ; myLibrary.length > i; i++) {
        const book = createDiv('book');
        book.appendChild(createDiv('title' , `${myLibrary[i].title}`));
        book.appendChild(createDiv('author' , `Author: ${myLibrary[i].author}`));
        book.appendChild(createDiv('pages' , `Pages: ${myLibrary[i].pages}`));
        book.appendChild(createDiv('read' , `${myLibrary[i].read}`));
        bookContainer.appendChild(book);
    }
}

function createDiv(selector, content){
    const div = document.createElement('div');
    div.classList.add(selector);
    div.textContent = content;
    return div
};

displayBooks()

submitBtn.addEventListener('click', (e) =>{
    const isFormValid = document.querySelector('form').checkValidity();
    if(isFormValid){
        e.preventDefault();
        Book();
        addBookToLibrary();
        displayBooks();
        toggleModal();
    }
})