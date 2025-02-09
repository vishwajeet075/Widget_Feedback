// Fetch deployment version from meta tag
const deploymentVersion = document.querySelector('meta[name="deployment-version"]')?.content || "unknown";

// Backend API URL
const backendUrl = "https://api.greenovate.in/feedback";

// Create feedback modal
const feedbackModal = document.createElement("div");
feedbackModal.style.position = "fixed";
feedbackModal.style.top = "50%";
feedbackModal.style.left = "50%";
feedbackModal.style.transform = "translate(-50%, -50%)";
feedbackModal.style.background = "white";
feedbackModal.style.padding = "20px";
feedbackModal.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
feedbackModal.style.borderRadius = "10px";
feedbackModal.style.display = "none";
feedbackModal.style.zIndex = "1000";
feedbackModal.innerHTML = `
    <h3>We value your feedback!</h3>
    <p>Help us improve by sharing your thoughts.</p>
    <button id="giveFeedback" style="background: green; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">Give Feedback</button>
    <button id="maybeLater" style="background: blue; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">Maybe Later</button>
    <button id="closeFeedback" style="background: red; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">No Thanks</button>
`;

// Append to body
document.body.appendChild(feedbackModal);

// Show the modal after a delay
setTimeout(() => {
    feedbackModal.style.display = "block";
}, 3000);

// Handle feedback actions
document.getElementById("giveFeedback").addEventListener("click", () => {
    window.location.href = `${backendUrl}?version=${deploymentVersion}`;
});
document.getElementById("maybeLater").addEventListener("click", () => {
    feedbackModal.style.display = "none";
});
document.getElementById("closeFeedback").addEventListener("click", () => {
    feedbackModal.style.display = "none";
});
