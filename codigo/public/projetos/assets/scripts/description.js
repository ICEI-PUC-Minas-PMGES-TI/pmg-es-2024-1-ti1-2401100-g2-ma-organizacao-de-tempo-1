const descriptionsPerPage = 1;
let currentPage = 1;
let descriptions = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchDescriptions();
    document.getElementById('registerButton').addEventListener('click', registerDescription);
});

function fetchDescriptions() {
    fetch('/data/info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON.');
            }
            return response.json();
        })
        .then(data => {
            descriptions = data.descriptions;
            displayDescriptions();
        })
        .catch(error => {
            console.error('Erro na requisição JSON:', error);
            document.getElementById('descriptionList').innerHTML = '<p>Erro ao carregar as descrições.</p>';
        });
}

function registerDescription() {
    const title = document.getElementById('descriptionTitle').value.trim();
    const text = document.getElementById('descriptionText').value.trim();

    if (title && text) {
        const newDescription = { title, text };
        descriptions.push(newDescription);
        saveDescriptions();

        // Clear the form fields
        document.getElementById('descriptionTitle').value = '';
        document.getElementById('descriptionText').value = '';

        // Dismiss the modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide();

        // Update the displayed descriptions
        displayDescriptions();
    } else {
        alert('Both fields are required!');
    }
}

function saveDescriptions() {
    fetch('/data/info.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descriptions })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar os dados.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados salvos com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao salvar os dados:', error);
        });
}

function displayDescriptions() {
    const descriptionList = document.getElementById('descriptionList');
    const paginationControls = document.getElementById('paginationControls');

    if (descriptions.length === 0) {
        descriptionList.innerHTML = '<p>No descriptions available. Please register a description.</p>';
        paginationControls.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(descriptions.length / descriptionsPerPage);
    const start = (currentPage - 1) * descriptionsPerPage;
    const end = start + descriptionsPerPage;
    const currentDescriptions = descriptions.slice(start, end);

    descriptionList.innerHTML = currentDescriptions.map((desc, index) => `
        <div class="container d-flex flex-column align-items-center justify-content-center">
            <h3>${desc.title}</h3>
            <p>${desc.text}</p>
            <div>
                <button class="btn btn-danger" onclick="removeDescription(${start + index})">Remove</button>
            </div>
        </div>
    `).join('');

    paginationControls.innerHTML = `
        <nav>
            <ul class="pagination">
                <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${currentPage - 1})">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                ${Array.from({ length: totalPages }, (_, i) => `
                    <li class="page-item ${currentPage === i + 1 ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="changePage(${i + 1})">${i + 1}</a>
                    </li>
                `).join('')}
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link" href="#" aria-label="Next" onclick="changePage(${currentPage + 1})">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    `;
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(descriptions.length / descriptionsPerPage)) {
        return;
    }
    currentPage = page;
    displayDescriptions();
}

function removeDescription(index) {
    descriptions.splice(index, 1);
    saveDescriptions();
    displayDescriptions();
}
