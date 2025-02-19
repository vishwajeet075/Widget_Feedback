// Fetch deployment version from meta tag
const deploymentVersion = document.querySelector('meta[name="deployment-version"]')?.content || "unknown";

// Backend API URL
const backendUrl = "https://eba9-2409-4081-d94-e3d6-78f9-9d4e-5335-4b06.ngrok-free.app";

// Check if the modal has already been shown in this session
if (!localStorage.getItem("feedbackShown")) {
    // Create feedback modal
    const feedbackModal = document.createElement("div");
    feedbackModal.style.position = "fixed";
    feedbackModal.style.top = "50%";
    feedbackModal.style.left = "50%";
    feedbackModal.style.transform = "translate(-50%, -50%)";
    feedbackModal.style.background = "linear-gradient(135deg, #f5f7fa, #c3cfe2)";
    feedbackModal.style.padding = "25px";
    feedbackModal.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
    feedbackModal.style.borderRadius = "15px";
    feedbackModal.style.display = "none";
    feedbackModal.style.zIndex = "1000";
    feedbackModal.style.width = "300px";
    feedbackModal.style.textAlign = "center";
    feedbackModal.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    feedbackModal.innerHTML = `
        <h3 style="margin: 0 0 15px; color: #333;">We Value Your Feedback!</h3>
        <p style="margin: 0 0 20px; color: #555;">Help us improve by sharing your thoughts.</p>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <button id="giveFeedback" style="background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background 0.3s;">Give Feedback</button>
            <button id="maybeLater" style="background: #2196F3; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background 0.3s;">Maybe Later</button>
            <button id="closeFeedback" style="background: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background 0.3s;">No Thanks</button>
        </div>
    `;

    // Append to body
    document.body.appendChild(feedbackModal);

    // Show the modal after a delay
    setTimeout(() => {
        feedbackModal.style.display = "block";
        feedbackModal.style.opacity = "1";
    }, 3000);

    // Handle feedback actions
    document.getElementById("giveFeedback").addEventListener("click", () => {
        window.location.href = `${backendUrl}?version=${deploymentVersion}`;
    });
    document.getElementById("maybeLater").addEventListener("click", () => {
        feedbackModal.style.opacity = "0";
        setTimeout(() => {
            feedbackModal.style.display = "none";
        }, 300);
    });
    document.getElementById("closeFeedback").addEventListener("click", () => {
        feedbackModal.style.opacity = "0";
        setTimeout(() => {
            feedbackModal.style.display = "none";
        }, 300);
        localStorage.setItem("feedbackShown", "true");
    });

    // Add hover effects to buttons
    const buttons = feedbackModal.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.05)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });
}

// Floating feedback button for users to reopen the form
const floatingButton = document.createElement("button");
floatingButton.style.position = "fixed";
floatingButton.style.bottom = "20px";
floatingButton.style.right = "20px";
floatingButton.style.background = "#4CAF50";
floatingButton.style.color = "white";
floatingButton.style.padding = "10px 20px";
floatingButton.style.border = "none";
floatingButton.style.borderRadius = "25px";
floatingButton.style.cursor = "pointer";
floatingButton.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
floatingButton.style.transition = "background 0.3s, transform 0.3s";
floatingButton.innerText = "Feedback";
document.body.appendChild(floatingButton);

// Show modal when floating button is clicked
floatingButton.addEventListener("click", () => {
    const feedbackModal = document.querySelector("#feedback-modal");
    if (feedbackModal) {
        feedbackModal.style.display = "block";
        feedbackModal.style.opacity = "1";
    }
});

// Add hover effect to floating button
floatingButton.addEventListener("mouseenter", () => {
    floatingButton.style.transform = "scale(1.1)";
});
floatingButton.addEventListener("mouseleave", () => {
    floatingButton.style.transform = "scale(1)";
});