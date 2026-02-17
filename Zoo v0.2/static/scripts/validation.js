const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')


function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = [] // Creates a blank array

    // if field input is blank or null (also blank) pushes an error message and adds the incorrect class (from css)

    if (firstname === '' || firstname == null) {
        errors.push('Firstname is required')
        firstname_input.parentElement.classList.add('incorrect')
    }
    if (email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    if (password.length < 8) {
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }

    if (password !== repeatPassword) {
        errors.push('Password does not match repeated password')
        password_input.parentElement.classList.add('incorrect')
        repeat_password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}


function getLoginFormErrors(email, password) {
    let errors = []

    if (email === '' || email == null) {
        errors.push('Email')
        email_input.parentElement.classList.add('incorrect')
    }

    if (password === '' || password == null) {
        errors.push('Password is incorrect')
        password_input.parentElement.classList.add('incorrect')
    }

    error_message.innerText = errors.join(" or ") // Adds error messages together . and space is for proper punctuation
    console.log("msg", error_message)
}


form.addEventListener('submit', (e) => {

    let errors = []

    if (firstname_input) {
        // If we have a firstname input then we are in the signup page
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)
    }

    if (errors.length > 0) {
        // If there are any errors
        e.preventDefault() //prevent submission
        error_message.innerText = errors.join(". ") // Adds error messages together . and space is for proper punctuation
        console.log("msg", error_message)
    }
})


const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

// Activates every time the user enters something in the input element, checks if the input has the 'incorrect' class, (red styling), and if it does it will remove it.
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})

