document.querySelectorAll('#createUserForm input, #createUserForm select').forEach((el) => {
    el.addEventListener('blur', () => {
        validateFormFields(el);
    });
});

function validateFormFields(element) {
    var container_inp = element.parentElement;
    let response;
    if (element.value === '') {
        container_inp.querySelector('.form-text').classList.remove('d-none');
        response = false;
        setTimeout(() => {
            container_inp.querySelector('.form-text').classList.add('d-none');
        }, 3000);
    } else {
        response = true;
        if (!container_inp.querySelector('.form-text').classList.contains('d-none'))
            container_inp.querySelector('.form-text').classList.add('d-none');
    }

    return response;
}

function validateForm() {
    event.currentTarget.querySelectorAll('input, select').forEach((ele) => {
        if (!validateFormFields(ele))
            event.preventDefault();
    });
}

function search() {
    var key = event.target.value.toLocaleLowerCase();
    console.log(event.target.value);
    document.querySelectorAll('#user-data tbody tr').forEach((row) => {
        var row_columns = Array(...row.querySelectorAll('td'));
        if (row_columns.find((t) => t.textContent.toLocaleLowerCase().includes(key))) {
            row.classList.remove('d-none');
        } else {
            row.classList.add('d-none');
        }
    });
}