// Exit Intent Feedback Widget
(function() {
    // Configurable parameters
    const CONFIG = {
        dashboardUrl: 'https://your-dashboard-url.com/feedback', // Specific dashboard feedback URL
        primaryColor: '#3498db',
        secondaryColor: '#2ecc71',
        overlayOpacity: 0.8
    };

    // Create sophisticated widget with improved styling
    function createWidget() {
        const overlay = document.createElement('div');
        overlay.id = 'exit-feedback-overlay';
        overlay.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,${CONFIG.overlayOpacity});
            z-index: 10000;
            justify-content: center;
            align-items: center;
            font-family: 'Arial', sans-serif;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 12px;
            width: 400px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
            transform: scale(0.7);
            opacity: 0;
            transition: all 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="margin-bottom: 20px;">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="${CONFIG.primaryColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <h2 style="color:${CONFIG.primaryColor}; margin-top: 15px;">Quick Feedback</h2>
            </div>
            <p style="color:#333; margin-bottom: 25px;">
                We're constantly improving. Your feedback helps us do that!
            </p>
            <div style="display: flex; justify-content: space-between;">
                <button id="feedback-btn" style="
                    flex: 1;
                    margin-right: 10px;
                    background-color: ${CONFIG.primaryColor};
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">Give Feedback</button>
                <button id="close-btn" style="
                    flex: 1;
                    background-color: #f0f0f0;
                    color: #333;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">Close</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        return { overlay, modal };
    }

    // Exit intent and widget logic
    function initExitIntentWidget() {
        const { overlay, modal } = createWidget();

        function detectExit(e) {
            if (e.clientY <= 50 || e.clientX >= window.innerWidth - 50) {
                showWidget();
            }
        }

        function showWidget() {
            overlay.style.display = 'flex';
            setTimeout(() => {
                modal.style.transform = 'scale(1)';
                modal.style.opacity = '1';
            }, 50);
        }

        function hideWidget() {
            modal.style.transform = 'scale(0.7)';
            modal.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }

        // Event Listeners
        document.addEventListener('mouseleave', detectExit);
        
        document.getElementById('feedback-btn').addEventListener('click', () => {
            // Redirect to dashboard feedback page
            window.location.href = CONFIG.dashboardUrl;
        });
        
        document.getElementById('close-btn').addEventListener('click', hideWidget);
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExitIntentWidget);
    } else {
        initExitIntentWidget();
    }
})();