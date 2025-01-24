(function() {
    const CONFIG = {
        dashboardUrl: 'https://your-dashboard-url.com/feedback',
        primaryColor: '#2ecc71',
        secondaryColor: '#3498db',
        tertiaryColor: '#e74c3c',
        overlayOpacity: 0.8
    };

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
            font-family: 'Montserrat', sans-serif;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 12px;
            width: 420px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
            transform: scale(0.7);
            opacity: 0;
            transition: all 0.3s ease;
        `;

        modal.innerHTML = `
            <h2 style="color:${CONFIG.primaryColor}; margin-bottom: 20px;">Spin the Wheel 🎡</h2>
            <p style="color:#666; margin-bottom: 30px;">
                Spin the wheel and let us know your thoughts!
            </p>
            <div id="wheel-container" style="position: relative; width: 300px; height: 300px; margin: 0 auto;">
                <div id="wheel" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: conic-gradient(
                        ${CONFIG.primaryColor} 0%,
                        ${CONFIG.primaryColor} 33.33%,
                        ${CONFIG.secondaryColor} 33.33%,
                        ${CONFIG.secondaryColor} 66.66%,
                        ${CONFIG.tertiaryColor} 66.66%,
                        ${CONFIG.tertiaryColor} 100%
                    );
                    border-radius: 50%;
                    animation: spin 5s linear;
                    animation-fill-mode: forwards;
                ">
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 80%;
                        height: 80%;
                        background-color: white;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 24px;
                        font-weight: bold;
                        color: ${CONFIG.primaryColor};
                        cursor: pointer;
                    ">Spin</div>
                </div>
            </div>
            <div style="margin-top: 40px;">
                <button id="feedback-btn" style="
                    background-color: ${CONFIG.primaryColor};
                    color: white;
                    border: none;
                    padding: 14px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-size: 14px;
                    font-weight: 600;
                    margin-right: 15px;
                ">Give Feedback</button>
                <button id="close-btn" style="
                    background-color: #f0f0f0;
                    color: #333;
                    border: none;
                    padding: 14px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-size: 14px;
                    font-weight: 600;
                ">No, Thanks</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        return { overlay, modal };
    }

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

            // Spin the wheel
            const wheel = document.getElementById('wheel');
            wheel.style.animation = 'spin 5s linear';
            setTimeout(() => {
                wheel.style.animation = '';
                const result = Math.floor(Math.random() * 100);
                if (result < 80) {
                    document.getElementById('feedback-btn').click();
                } else {
                    document.getElementById('close-btn').click();
                }
            }, 5000);
        }

        function hideWidget() {
            modal.style.transform = 'scale(0.7)';
            modal.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }

        document.addEventListener('mouseleave', detectExit);
        
        document.getElementById('feedback-btn').addEventListener('click', () => {
            window.location.href = CONFIG.dashboardUrl;
        });
        
        document.getElementById('close-btn').addEventListener('click', hideWidget);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExitIntentWidget);
    } else {
        initExitIntentWidget();
    }
})();