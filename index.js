console.log('JS is running')

const nameRegex = /^[a-zA-Z\s]{2,50}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const subjectRegex = /^[\w\s.,!?-]{3,100}$/
const messageRegex = /^[\s\S]{10,}$/

function showError(id, message) {
  document.getElementById(id).textContent = message
}

function clearError(id) {
  document.getElementById(id).textContent = ''
}

function checkFormValid() {
  const name = document.getElementById('name').value.trim()
  const email = document.getElementById('email').value.trim()
  const subject = document.getElementById('subject').value.trim()
  const message = document.getElementById('message').value.trim()

  const isValid =
    nameRegex.test(name) &&
    emailRegex.test(email) &&
    subjectRegex.test(subject) &&
    messageRegex.test(message)

  document.getElementById('submit-btn').disabled = !isValid
}


document.getElementById('name').addEventListener('blur', () => {
  const val = document.getElementById('name').value.trim()
  !nameRegex.test(val)
    ? showError('name-error', 'Letters only, 2–50 characters')
    : clearError('name-error')
})

document.getElementById('email').addEventListener('blur', () => {
  const val = document.getElementById('email').value.trim()
  !emailRegex.test(val)
    ? showError('email-error', 'Please enter a valid email address')
    : clearError('email-error')
})

document.getElementById('subject').addEventListener('blur', () => {
  const val = document.getElementById('subject').value.trim()
  !subjectRegex.test(val)
    ? showError('subject-error', 'Subject must be 3–100 characters')
    : clearError('subject-error')
})

document.getElementById('message').addEventListener('blur', () => {
  const val = document.getElementById('message').value.trim()
  !messageRegex.test(val)
    ? showError('message-error', 'Message must be at least 10 characters')
    : clearError('message-error')
})


document.querySelectorAll('#contact-form input, #contact-form textarea').forEach((el) => {
  el.addEventListener('input', checkFormValid)
})


document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const btn = document.getElementById('submit-btn')
  btn.textContent = 'Sending...'
  btn.disabled = true

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  }

  try {
    const response = await fetch('https://formspree.io/f/mkoejlgg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      btn.textContent = 'Message Sent!'
      document.getElementById('contact-form').reset()
      setTimeout(() => {
        btn.textContent = 'Send Message'
      }, 3000)
    } else {
      btn.textContent = 'Failed — Try Again'
      btn.disabled = false
    }
  } catch (error) {
    btn.textContent = 'Error — Try Again'
    btn.disabled = false
  }
})
const menuBtn = document.querySelector('.menu-btn')
const navMenu = document.getElementById('nav-menu')
const navLinks = document.querySelectorAll('#nav-menu a')

// toggle menu open/close
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('menu-open')

  // switch icon between ☰ and ✕
  menuBtn.textContent = navMenu.classList.contains('menu-open') ? '✕' : '☰'

  // update accessibility attribute
  menuBtn.setAttribute('aria-expanded',
    navMenu.classList.contains('menu-open'))
})

// close menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('menu-open')
    menuBtn.textContent = '☰'
    menuBtn.setAttribute('aria-expanded', false)
  })
})

// close menu when clicking outside nav
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    navMenu.classList.remove('menu-open')
    menuBtn.textContent = '☰'
    menuBtn.setAttribute('aria-expanded', false)
  }
})
