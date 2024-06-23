     const descriptionsPerPage = 1;
        let currentPage = 1;
        let updateIndex = null;
    displayDescriptions();
        document.getElementById('registerButton').addEventListener('click', function () {
            const title = document.getElementById('descriptionTitle').value.trim();
            const text = document.getElementById('descriptionText').value.trim();

            if (title && text) {
                const newDescription = { title, text };
                let descriptions = localStorage.getItem('descriptions');
                if (descriptions) {
                    descriptions = JSON.parse(descriptions);
                } else {
                    descriptions = [];
                }
                descriptions.push(newDescription);
                localStorage.setItem('descriptions', JSON.stringify(descriptions));

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
        });

        function displayDescriptions() {
            const descriptionList = document.getElementById('descriptionList');
            const paginationControls = document.getElementById('paginationControls');
            let descriptions = localStorage.getItem('descriptions');
            if (descriptions) {
                descriptions = JSON.parse(descriptions);
            } else {
                descriptions = [];
            }

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
                    <ul class="pagination ">
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
            let descriptions = localStorage.getItem('descriptions');
            if (descriptions) {
                descriptions = JSON.parse(descriptions);
            } else {
                descriptions = [];
            }

            if (page < 1 || page > Math.ceil(descriptions.length / descriptionsPerPage)) {
                return;
            }
            currentPage = page;
            displayDescriptions();
        }

        function removeDescription(index) {
            let descriptions = localStorage.getItem('descriptions');
            if (descriptions) {
                descriptions = JSON.parse(descriptions);
            } else {
                descriptions = [];
            }

            descriptions.splice(index, 1);
            localStorage.setItem('descriptions', JSON.stringify(descriptions));
            displayDescriptions();
        }

        