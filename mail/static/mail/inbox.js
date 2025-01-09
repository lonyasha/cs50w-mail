document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views
  document.querySelector("#inbox").addEventListener("click", (event) => {
    event.preventDefault();
    loadMailbox("inbox");
  });
  document.querySelector("#sent").addEventListener("click", (event) => {
    event.preventDefault();
    loadMailbox("sent");
  });
  document.querySelector("#archived").addEventListener("click", (event) => {
    event.preventDefault();
    loadMailbox("archive");
  });
  document.querySelector("#compose").addEventListener("click", (event) => {
    event.preventDefault();
    composeEmail();
  });

  // By default, load the inbox
  loadMailbox("inbox");

  // Send email
  document.querySelector("#compose-form").onsubmit = handleFormSubmission;
});

function composeEmail(recipients = "", subject = "", body = "") {
  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";
  document.querySelector("#email-view").style.display = "none";

  // Pre-fill the fields if provided
  document.querySelector("#compose-recipients").value = recipients || "";
  document.querySelector("#compose-subject").value = subject || "";
  document.querySelector("#compose-body").value = body || "";
}

function loadMailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";
  document.querySelector("#email-view").style.display = "none";

  // Show the mailbox name
  document.querySelector("#emails-view").innerHTML = `<h3>${
    mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
  }</h3>`;

  // Fetch the emails
  fetch(`/emails/${mailbox}`)
    .then((response) => response.json())
    .then((emails) => {
      // Clear previous emails
      document.querySelector("#emails-view").innerHTML = `<h3>${
        mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
      }</h3>`;

      // Loop through emails and create a div for each one
      emails.forEach((email) => {
        const emailDiv = document.createElement("div");
        emailDiv.className = "email";
        emailDiv.style.border = "1px solid black";
        emailDiv.style.padding = "10px";
        emailDiv.style.margin = "10px";
        emailDiv.style.backgroundColor = email.read ? "lightgray" : "white";

        emailDiv.style.display = "flex";
        emailDiv.style.justifyContent = "space-between";
        emailDiv.style.alignItems = "center";

        let displayAddress =
          mailbox === "sent"
            ? `To: <strong>${email.recipients.join(", ")}</strong>`
            : `<strong>${email.sender}</strong>`;

        emailDiv.innerHTML = `
            <div style="flex: 1; padding-right: 10px;">${displayAddress}</div>
            <div style="flex: 2; padding-right: 10px;">${email.subject}</div>
            <div style="flex: 1; text-align: right;">${email.timestamp}</div>
          `;

        emailDiv.addEventListener("click", () => viewEmail(email.id));

        document.querySelector("#emails-view").append(emailDiv);
      });
      console.log(emails);
    });
}

function handleFormSubmission(event) {
  event.preventDefault();

  const recipients = document.querySelector("#compose-recipients").value;
  const subject = document.querySelector("#compose-subject").value;
  const body = document.querySelector("#compose-body").value;

  sendEmail(recipients, subject, body);
}

function sendEmail(recipients, subject, body) {
  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.message) {
        loadMailbox("sent");
      } else {
        alert(result.error);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function viewEmail(emailId) {
  // Show the email view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "none";
  document.querySelector("#email-view").style.display = "block";

  // Fetch the email
  fetch(`/emails/${emailId}`)
    .then((response) => response.json())
    .then((email) => {
      // Display the email details
      document.querySelector("#email-from").textContent = email.sender;
      document.querySelector("#email-to").textContent =
        email.recipients.join(", ");
      document.querySelector("#email-subject").textContent = email.subject;
      document.querySelector("#email-timestamp").textContent = email.timestamp;
      document.querySelector("#email-body").textContent = email.body;

      // Clear any previous buttons
      document
        .querySelector("#email-view")
        .querySelectorAll("button")
        .forEach((button) => button.remove());

      // Mark the email as read
      if (!email.read) {
        fetch(`/emails/${emailId}`, {
          method: "PUT",
          body: JSON.stringify({
            read: true,
          }),
        });
      }

      // Add buttons
      if (
        email.recipients.includes(
          document.querySelector("h2").textContent.trim()
        )
      ) {
        // Add the "Reply" button
        const replyButton = document.createElement("button");
        replyButton.className = "btn btn-sm btn-outline-primary";
        replyButton.textContent = "Reply";
        replyButton.addEventListener("click", () => replyEmail(email));
        document.querySelector("#email-buttons").append(replyButton);

        // Add the archive/unarchive button if applicable
        const archiveButton = document.createElement("button");
        archiveButton.className = "btn btn-sm btn-outline-primary";
        if (email.archived) {
          archiveButton.textContent = "Unarchive";
          archiveButton.addEventListener("click", () =>
            archiveEmail(emailId, false)
          );
        } else {
          archiveButton.textContent = "Archive";
          archiveButton.addEventListener("click", () =>
            archiveEmail(emailId, true)
          );
        }
        document.querySelector("#email-buttons").append(archiveButton);
      }
    });
}

function replyEmail(originalEmail) {
  // Pre-fill the recipient as the original sender
  const recipients = originalEmail.sender;

  // Pre-fill the subject
  let subject = originalEmail.subject;
  if (!subject.startsWith("Re:")) {
    subject = "Re: " + subject;
  }

  // Pre-fill the body
  const body = `\n\n-------------------------\nOn ${originalEmail.timestamp}, ${originalEmail.sender} wrote:\n${originalEmail.body}`;

  // Call composeEmail with pre-filled values
  composeEmail(recipients, subject, body);
}

function archiveEmail(emailId, archiveStatus) {
  // Send a PUT request to update the archived status
  fetch(`/emails/${emailId}`, {
    method: "PUT",
    body: JSON.stringify({
      archived: archiveStatus,
    }),
  }).then(() => {
    // After archiving/unarchiving, load the inbox
    loadMailbox("inbox");
  });
}
