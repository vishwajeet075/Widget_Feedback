(function() {
    const CONFIG = {
        dashboardUrl: 'https://sentimental-model-a4vz.onrender.com',
        sectors: [
            { option: 'Give Feedback', color: '#2ecc71' }, // Green
            { option: 'Maybe Later', color: '#3498db' },   // Blue
            { option: 'No Thanks', color: '#e74c3c' }     // Red
        ],
        overlayOpacity: 0.85
    };

    function getDeploymentVersion() {
        const metaTag = document.querySelector('meta[name="deployment-version"]');
        return metaTag ? metaTag.content : 'unknown';
    }

    function createWidget() {
        const overlay = document.createElement('div');
        overlay.id = 'feedback-overlay';
        overlay.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,${CONFIG.overlayOpacity});
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: 'Poppins', sans-serif;
        `;

        const modal = document.createElement('div');
        modal.id = 'feedback-modal';
        modal.style.cssText = `
            background: #fff;
            border-radius: 16px;
            width: 450px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: fadeIn 0.3s ease-in-out;
        `;

        const title = document.createElement('h2');
        title.textContent = 'We value your feedback!';
        title.style.cssText = 'color: #333; margin-bottom: 20px;';
        
        const message = document.createElement('p');
        message.textContent = 'Help us improve by sharing your thoughts.';
        message.style.cssText = 'color: #666; margin-bottom: 25px;';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; justify-content: space-around;';
        
        CONFIG.sectors.forEach((sector) => {
            const button = document.createElement('button');
            button.textContent = sector.option;
            button.style.cssText = `
                background-color: ${sector.color};
                color: #fff;
                border: none;
                padding: 12px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: transform 0.2s;
            `;
            button.addEventListener('mouseover', () => {
                button.style.transform = 'scale(1.1)';
            });
            button.addEventListener('mouseout', () => {
                button.style.transform = 'scale(1)';
            });
            button.addEventListener('click', () => handleFeedback(sector.option));
            buttonContainer.appendChild(button);
        });

        modal.appendChild(title);
        modal.appendChild(message);
        modal.appendChild(buttonContainer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        return overlay;
    }

    function handleFeedback(option) {
        const version = getDeploymentVersion();
        if (option === 'Give Feedback') {
            window.location.href = `${CONFIG.dashboardUrl}?version=${version}`;
        } else {
            document.getElementById('feedback-overlay').style.display = 'none';
        }
    }

    function showWidget() {
        document.getElementById('feedback-overlay').style.display = 'flex';
    }

    document.addEventListener('DOMContentLoaded', () => {
        const overlay = createWidget();
        setTimeout(showWidget, 3000); // Show after 3 seconds
    });
})();
