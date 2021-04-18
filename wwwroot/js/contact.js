const dev = true;
const emailRegex = /\S+@\S+\.\S+/;
// Holds the id of contact Page elements
const contactID = {
  CONTACT_FORM: "contactForm",
  SENDER: "sender",
  EMAIL: "email",
  MESSAGE: "message",
  SEND_BTN: "sendBtn",
  MODAL: "tmModal",
  MODAL_MESSAGE: "modalMessage",
}

// Holds reference to HTML elements
const contactPage = { };

function init() {
  console.log("Contact Page")
  initializeDomElements();
  setEventListeners();
  if (dev) { 
    testContactData();
    testRegex()
  };
}

function initializeDomElements() {
  console.log('initializeDomElements()', 'getting DOM elements')
  for (let key in contactID) {
    const elementID = contactID[key];
    contactPage[elementID] = document.getElementById(elementID);
    contactPage["$" + elementID] = $(contactPage[elementID]);
    console.log(`getting element ${elementID}, ${contactPage[elementID]}`);
  }
  console.log(contactPage);
}

function setEventListeners() {
  contactPage.contactForm.addEventListener('submit', submitContactForm);
  contactPage.$tmModal.hide();
}

function submitContactForm(e) {
  e.preventDefault();

  const name = contactPage.$sender.val();
  const email = contactPage.$email.val();
  const msg = contactPage.$email.val();
  const messageToSend = {name, email, msg };
  if (!validateForm(messageToSend)) return;

  console.log(`sending message...`, messageToSend);
}

function validateForm(message) {
  console.log("validateForm()");

  const validName = message.name.length > 0;
  if (!validName) {
    console.error("Invalid Sender Input");
    alertInputError("Name enter a name.");
    return false;
  }

  const regexMatch = emailRegex.test(message.email);
  const validEmail = regexMatch && (message.email.length > 0); 
  if (!validEmail ) {
    console.error("Invalid Description Input");
    alertInputError("Must be a valid email");
    return false;
  }

  const validMessage = message.msg.length > 5;
  if (!validMessage) {
    console.error("Invalid Status Input");
    alertInputError("Message must be more than 5 characters.");
    return false;
  }

  return true;
}

function alertInputError(msg) {
  contactPage.$tmModal.text(msg);
  contactPage.$tmModal.show();
}

function alertInputErrorClose() {
  contactPage.$tmModal.hide();
}

init();

function testContactData() {
  console.log("testContactData()");
  contactPage.$sender.val("Jerald");
  contactPage.$email.val("jerald@maca.com");
  contactPage.$message.val("Hello World!!! How Are you???");
}

function testRegex() {
  console.log("testRegex()");
  const tests = [
    {
      email: "",
      expected: false
    },
    {
      email: "jerald",
      expected: false
    },
    {
      email: "jerald.macachor",
      expected: false
    },
    {
      email: "jerald.macachor@",
      expected: false
    },
    {
      email: "jerald.macachor@gmail",
      expected: false
    },
    {
      email: "jerald.macachor@gmail.com",
      expected: true
    },
    {
      email: "jerald.macachor@cable.comcast.com",
      expected: true
    }
  ];
  for (const test of tests) {
    const passFail = emailRegex.test(test.email) === test.expected ? "Passed" : "Failed";
    console.log(test.email, test.expected, passFail); 
  }

}
