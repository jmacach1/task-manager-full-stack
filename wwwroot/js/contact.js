const dev = true;
const contact = {
  CONTACT_FORM: "contactForm",
  SENDER: "sender",
  EMAIL: "email",
  MESSAGE: "message",
  SEND_BTN: "sendBtn",
}
const contactPage = {};

function init() {
  console.log("Task Manager!")
  initializeDomElements();
  setEventListeners();
  if (dev) testFormData();
}

function initializeDomElements() {
  console.log('initializeDomElements()', 'getting DOM elements')
  contactPage.contactForm = document.getElementById(contact.CONTACT_FORM);
  contactPage.sender = document.getElementById(contact.SENDER);
  contactPage.email = document.getElementById(contact.EMAIL);
  contactPage.message = document.getElementById(contact.MESSAGE);
  contactPage.sendBtn = document.getElementById(contact.SEND_BTN);
}

function setEventListeners() {
  contactPage.contactForm.addEventListener('submit', submitContactForm);
}

function submitContactForm(e) {
  e.preventDefault();
  validateForm();
}

function validateForm() {
  console.log("validateForm");
  const validTitle = taskInputs[TASK_CONST.TITLE].val().length > 5;
  if (!validTitle) {
    console.error("Invalid Title Input");
    alertInputError("Title must be more than 5 characters");
    return false;
  }
  const validDescription = taskInputs[TASK_CONST.DESCRIPTION].val().length > 5;
  if (!validDescription) {
    console.error("Invalid Description Input");
    alertInputError("Description must be more than 5 characters");
    return false;
  }
  const validStatus = taskInputs[TASK_CONST.STATUS].children()[0].selected == false;
  if (!validStatus) {
    console.error("Invalid Status Input");
    alertInputError("Select a status for this task");
    return false;
  }
  const valid = taskForm.checkValidity();
  if(!valid) taskForm.classList.add('was-validated');
  return valid;
}

function alertInputError(msg) {
  modal.modal.show();
  modal.message.text(msg)
}

function alertInputErrorClose() {
  modal.modal.hide();
}