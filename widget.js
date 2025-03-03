// Fetch deployment version from meta tag
const deploymentVersion = document.querySelector('meta[name="deployment-version"]')?.content || "unknown";

// Backend API URL
const backendUrl = "https://ee46-2401-4900-7c77-9d1a-4d1a-2291-53b8-8833.ngrok-free.app";

// Create and inject required styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .feedback-floating-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 8px 32px rgba(52, 152, 219, 0.25);
        transition: all 0.3s ease;
        z-index: 999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        font-weight: 500;
    }

    .feedback-floating-btn:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, #2980b9, #2573a7);
        box-shadow: 0 12px 36px rgba(52, 152, 219, 0.35);
    }

    .feedback-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ffffff, #f8f9fa);
        border: 1px solid rgba(52, 152, 219, 0.2);
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        width: 360px;
        opacity: 0;
        display: none;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .feedback-modal h3 {
        margin: 0 0 15px;
        color: #2c3e50;
        font-size: 24px;
        font-weight: 600;
        background: linear-gradient(135deg, #2c3e50, #3498db);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .feedback-modal p {
        margin: 0 0 25px;
        color: #5f6368;
        line-height: 1.5;
    }

    .feedback-modal-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .feedback-btn {
        padding: 12px 20px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
        font-size: 14px;
    }

    .feedback-btn-primary {
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        grid-column: 1 / -1;
    }

    .feedback-btn-primary:hover {
        background: linear-gradient(135deg, #2980b9, #2573a7);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.25);
    }

    .feedback-btn-secondary {
        background: #f8f9fa;
        color: #2c3e50;
        border: 1px solid rgba(52, 152, 219, 0.2);
    }

    .feedback-btn-secondary:hover {
        background: #f1f3f5;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border-color: rgba(52, 152, 219, 0.4);
    }

    .feedback-btn:hover {
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .feedback-modal {
            width: 90%;
            max-width: 360px;
        }
    }
`;
document.head.appendChild(styleSheet);

// Check if the modal has already been shown in this session
if (!localStorage.getItem("feedbackShown")) {
    // Create feedback modal
    const feedbackModal = document.createElement("div");
    feedbackModal.className = "feedback-modal";
    feedbackModal.innerHTML = `
        <h3>Help Us Improve!</h3>
        <p>Your feedback is valuable to us. Share your thoughts to help us enhance your experience.</p>
        <div class="feedback-modal-buttons">
            <button id="giveFeedback" class="feedback-btn feedback-btn-primary">Give Feedback</button>
            <button id="maybeLater" class="feedback-btn feedback-btn-secondary">Maybe Later</button>
            <button id="closeFeedback" class="feedback-btn feedback-btn-secondary">No Thanks</button>
        </div>
    `;

    // Append to body
    document.body.appendChild(feedbackModal);

    // Show the modal after a delay
    setTimeout(() => {
        feedbackModal.style.display = "block";
        // Force reflow
        feedbackModal.offsetHeight;
        feedbackModal.style.opacity = "1";
    }, 3000);

    // Handle feedback actions
    document.getElementById("giveFeedback").addEventListener("click", () => {
        window.location.href = `${backendUrl}?version=${deploymentVersion}`;
    });
    
    document.getElementById("maybeLater").addEventListener("click", () => {
        fadeOutModal(feedbackModal);
    });
    
    document.getElementById("closeFeedback").addEventListener("click", () => {
        fadeOutModal(feedbackModal);
        localStorage.setItem("feedbackShown", "true");
    });
}

// Create floating feedback button
const floatingButton = document.createElement("button");
floatingButton.className = "feedback-floating-btn";
floatingButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
    Feedback
`;
document.body.appendChild(floatingButton);

// Helper function to fade out modal
function fadeOutModal(modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

// Show modal when floating button is clicked
floatingButton.addEventListener("click", () => {
    const feedbackModal = document.querySelector(".feedback-modal");
    if (feedbackModal) {
        feedbackModal.style.display = "block";
        // Force reflow
        feedbackModal.offsetHeight;
        feedbackModal.style.opacity = "1";
    }
});