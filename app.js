const modalBtn = document.querySelector('.add-book');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submit-btn');
const bookContainer = document.querySelector('.container');
const read = document.querySelectorAll('.read')
const myLibrary = [
    {
        title: 'A Mind For Numbers: How to Excel at Math and Science',
        author: 'Barbara Oakley',
        pages: 332,
        read: 'Not read Yet',
        image:'https://pictures.abebooks.com/isbn/9781469061993-fr.jpg'
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

function Book(){
    this.title = document.querySelector('#book-name').value;
    this.author = document.querySelector('#author-name').value;
    this.pages = document.querySelector('#book-pages').value;
    this.read = document.querySelector('#read-status').value;
    if(!(document.querySelector('#book-image').value)){
        this.image = 'https://media.istockphoto.com/id/936182806/vector/no-image-available-sign.jpg?s=612x612&w=0&k=20&c=9HTEtmbZ6R59xewqyIQsI_pQl3W3QDJgnxFPIHb4wQE=';
    } else {
        this.image = document.querySelector('#book-image').value;
    };
    this.readStatus = () => {
        if(this.read == 'Read') {
            this.read = 'Not Read Yet'
        } else {
            this.read = 'Read'
        }
    };
}

function addBookToLibrary(){
    myLibrary.push(new Book());
}

function displayBooks(){
    document.querySelectorAll('.book').forEach(book => book.remove());
    for(let i = 0 ; myLibrary.length > i; i++) {
        const book = createDiv('book');
        book.appendChild(createImg(`${myLibrary[i].image}`))
        book.appendChild(createDiv('title' , `${myLibrary[i].title}`));
        book.appendChild(createDiv('author' , `Author: ${myLibrary[i].author}`));
        book.appendChild(createDiv('pages' , `Pages: ${myLibrary[i].pages}`));
        book.appendChild(createDiv('read' , `${myLibrary[i].read}`));
        const deleteBtn = createDiv('delete-book');
        deleteBtn.setAttribute(`data-id`,i)
        book.appendChild(deleteBtn);
        bookContainer.appendChild(book);
    };
    document.querySelectorAll('.delete-book').forEach(btn => btn.addEventListener('click',deleteBook));
};

function createDiv(selector, content){
    const div = document.createElement('div');
    div.classList.add(selector);
    div.textContent = content;
    return div
};

function createImg(url){
    const div = document.createElement('div');
    div.classList.add('image');
    div.style = `background-image: url(${url})`
    return div
};

function clearInput(){
    document.querySelector('form').reset();
};

function deleteBook(e){
    if (confirm("Are you want to delete?") === true) {
        myLibrary.splice(e.target.dataset.id, 1);
        displayBooks();
    }
}

displayBooks();

submitBtn.addEventListener('click', (e) =>{
    const isFormValid = document.querySelector('form').checkValidity();
    if(isFormValid){
        e.preventDefault();
        addBookToLibrary();
        displayBooks();
        toggleModal();
        clearInput();
    }
})