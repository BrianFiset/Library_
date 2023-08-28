const modalBtn = document.querySelector('.add-book');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');

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