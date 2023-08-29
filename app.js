const modalBtn = document.querySelector('.add-book');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submit-btn');
const bookContainer = document.querySelector('.container');
const myLibrary = [];

myLibrary.push(new Book('A Mind For Numbers: How to Excel at Math and Science','Barbara Oakley',332,'Not Read Yet','https://pictures.abebooks.com/isbn/9781469061993-fr.jpg'))

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

function Book(title,author,pages,read, url){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if(!(url)){
        this.image = 'https://media.istockphoto.com/id/936182806/vector/no-image-available-sign.jpg?s=612x612&w=0&k=20&c=9HTEtmbZ6R59xewqyIQsI_pQl3W3QDJgnxFPIHb4wQE=';
    } else {
        this.image = url;
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
    myLibrary.push(new Book(document.querySelector('#book-name').value
    ,document.querySelector('#author-name').value,
    document.querySelector('#book-pages').value,
    document.querySelector('#read-status').value,
    document.querySelector('#book-image').value));
}

function displayBooks(){
    document.querySelectorAll('.book').forEach(book => book.remove());
    for(let i = 0 ; myLibrary.length > i; i++) {
        const book = createDiv('book');
        book.appendChild(createImg(`${myLibrary[i].image}`))
        book.appendChild(createDiv('title' , `${myLibrary[i].title}`));
        book.appendChild(createDiv('author' , `Author: ${myLibrary[i].author}`));
        book.appendChild(createDiv('pages' , `Pages: ${myLibrary[i].pages}`));
        
        const readBtn = createDiv('read' , `${myLibrary[i].read}`);
        readBtn.setAttribute(`data-id`,i)
        book.appendChild(readBtn);

        const deleteBtn = createDiv('delete-book');
        deleteBtn.setAttribute(`data-id`,i)
        book.appendChild(deleteBtn);
        bookContainer.appendChild(book);
    };
    document.querySelectorAll('.delete-book').forEach(btn => btn.addEventListener('click',deleteBook));
    document.querySelectorAll('.read').forEach(btn => btn.addEventListener('click', (e) => {
        let number = e.target.dataset.id
        myLibrary[number].readStatus();
        displayBooks();
    }))
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
    if (confirm("Do you want to delete it?") === true) {
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