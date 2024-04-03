let mediaRecorder;
let chunks = [];

let scenario1 = "Hello John,\n\nI hope this message finds you well. I wanted to follow up on the recent support call you had with our team regarding the billing issue. We wanted to ensure that the solution we provided has resolved the problem to your satisfaction. If you have any further questions or require additional assistance, please do not hesitate to reach out to our support team. Your feedback is important to us, and we are committed to providing you with the best possible service.";
let scenario2 = "Hello Eula,\n\nI trust this email finds you well. I wanted to personally reach out to you regarding your recent purchase experience with us. First and foremost, I would like to extend my sincere apologies for any inconvenience you may have experienced during the checkout process. Your satisfaction is of utmost importance to us, and we deeply regret any frustration this may have caused. I'm pleased to hear that our support team was able to promptly address the issue and ensure a smooth resolution. We take great pride in our commitment to providing excellent customer service, and I'm glad to see that reflected in your recent interaction with us. As we continuously strive to enhance our customer experience, your feedback is invaluable to us. If you have any further thoughts or suggestions on how we can improve, please don't hesitate to share them with us. Once again, thank you for choosing XYZ Technologies. We truly appreciate your business and look forward to serving you again in the future.";
let scenario3 = "Dear Mika,\n\nWe hope this email finds you well. We wanted to extend our gratitude for your participation in our recent webinar on \"Effective Time Management Strategies for Professionals.\" We trust that you found the session insightful and valuable in your pursuit of enhancing productivity. At ABC Inc., we are committed to continuously improving our services and offerings. Your feedback is invaluable in helping us achieve this goal. We would greatly appreciate it if you could take a few moments to share your thoughts and suggestions regarding the webinar. Your insights will enable us to tailor future events to better meet your needs and interests. Additionally, we understand that time management is a crucial aspect of professional success, and we're here to support you in your journey. If you have any further questions or if there are specific topics you'd like us to cover in future webinars or resources you'd like to access, please feel free to let us know. We're here to help you succeed.Thank you once again for your participation. We truly value your support and look forward to continuing to serve you in your professional development endeavors.";

document.getElementById('startRecord').disabled = true;
var textArea = document.getElementById("text");

function checkSelectedValue() {
  // Get the select element
  var selectElement = document.getElementById("mySelect");
  
  // Get the selected value
  var selectedValue = selectElement.value;
  
  // Set the value of the textarea based on the selected value
  if (selectedValue == "sc-one") {
    textArea.value = scenario1;
    document.getElementById('startRecord').disabled = false;
   //make download button disable
    document.getElementById('downloadButton').disabled = true;
  } else if (selectedValue == "sc-two") {
    document.getElementById('startRecord').disabled = false;
    textArea.value = scenario2;
     //make download button disable
     document.getElementById('downloadButton').disabled = true;
  } else if (selectedValue == "sc-three") {
    document.getElementById('startRecord').disabled = false;
    textArea.value = scenario3;
    //make download button disable
    document.getElementById('downloadButton').disabled = true;
  } else{
    textArea.value = "";
  }
}

// Function to download audio
function downloadAudio(audioUrl, filename) {
  const a = document.createElement('a');
  a.href = audioUrl;
  a.download = filename;
  a.style.display = 'none'; // Hide the link
  document.body.appendChild(a); // Append the link to the document
  a.click(); // Simulate a click event on the link
  document.body.removeChild(a); // Remove the link from the document
}

//media recorder api
const startRecording = () => {
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      chunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioPlayer = document.getElementById('audioPlayer');
      audioPlayer.src = audioUrl;

      // Display and configure download button
      const downloadButton = document.getElementById('downloadButton');
      document.getElementById('downloadButton').disabled = false;
      downloadButton.addEventListener('click', () => {
        const fileName = prompt("Enter the file name:", "recording.wav");
        if (fileName !== null) {
          downloadAudio(audioUrl, fileName);

        }
      });
    };
    mediaRecorder.start();
  })
  .catch(error => {
    console.error('Error accessing microphone:', error);
  });
};

// Function to stop recording
const stopRecording = () => {
mediaRecorder.stop();
};

document.getElementById('startRecord').addEventListener('click', () => {
startRecording();

//make download button disable
document.getElementById('downloadButton').disabled = true;
document.getElementById('startRecord').disabled = true;
document.getElementById('stopRecord').disabled = false;
document.getElementById('mySelect').disabled = true;
});

document.getElementById('stopRecord').addEventListener('click', () => {
stopRecording();
document.getElementById('startRecord').disabled = false;
document.getElementById('stopRecord').disabled = true;
document.getElementById('mySelect').disabled = false;
});