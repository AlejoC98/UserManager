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