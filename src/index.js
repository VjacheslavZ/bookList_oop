import './styles/_page.scss'

//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() {}

//add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
};

UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

UI.prototype.showAlert = function(message, className) {
    const div = document.createElement('dif');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)
};

//EventListeners
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value,
              author = document.getElementById('author').value,
              isbn = document.getElementById('isbn').value;

        const book = new Book(title, author, isbn);

        //instantiate book
        const ui = new UI();
        
        //validate
        if(title === '' || author === "" || isbn === '') {
             ui.showAlert('Please fill in all fields', 'error');
        } else {
            ui.addBookToList(book);

            ui.showAlert('Book added', 'success');


            ui.clearFields();
        }
    }
);

document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();

    ui.deleteBook(e.target);
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});



