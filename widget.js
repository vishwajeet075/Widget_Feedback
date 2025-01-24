(function () {
    // Configuration
    const CONFIG = {
      dashboardUrl: 'https://your-dashboard-url.com/feedback',
      sectors: [
        { option: 'Give Feedback', color: '#2ecc71' }, // Green
        { option: 'Maybe Later', color: '#3498db' },   // Blue
        { option: 'No Thanks', color: '#e74c3c' },     // Red
      ],
      overlayOpacity: 0.8,
    };
  
    // Create the widget
    function createWidget() {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.id = 'exit-feedback-overlay';
      overlay.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, ${CONFIG.overlayOpacity});
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: 'Montserrat', sans-serif;
      `;
  
      // Create modal
      const modal = document.createElement('div');
      modal.id = 'feedback-modal';
      modal.style.cssText = `
        background: white;
        border-radius: 12px;
        width: 420px;
        padding: 40px;
        text-align: center;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
      `;
  
      // Create wheel container
      const wheelContainer = document.createElement('div');
      wheelContainer.id = 'wheel-container';
      wheelContainer.style.cssText = `
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 auto;
      `;
  
      // Create wheel
      const wheel = document.createElement('div');
      wheel.id = 'wheel';
      wheel.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        transform: rotate(0deg);
        transition: transform 5s ease-out;
      `;
  
      // Add sectors to the wheel
      CONFIG.sectors.forEach((sector, index) => {
        const sectorDiv = document.createElement('div');
        sectorDiv.className = 'sector';
        sectorDiv.textContent = sector.option;
        sectorDiv.style.cssText = `
          position: absolute;
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 50%, 100% 0, 100% 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          color: white;
          background-color: ${sector.color};
          transform: rotate(${index * 120}deg);
        `;
        wheel.appendChild(sectorDiv);
      });
  
      // Create pointer
      const pointer = document.createElement('div');
      pointer.id = 'pointer';
      pointer.style.cssText = `
        position: absolute;
        top: -10px;
        left: 50%;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid black;
        transform: translateX(-50%);
        z-index: 1;
      `;
  
      // Create spin button
      const spinButton = document.createElement('button');
      spinButton.id = 'spin-button';
      spinButton.textContent = 'Spin';
      spinButton.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #2ecc71;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        z-index: 2;
      `;
  
      // Assemble the widget
      wheelContainer.appendChild(wheel);
      wheelContainer.appendChild(pointer);
      wheelContainer.appendChild(spinButton);
  
      modal.innerHTML = `
        <h2>Spin the Wheel 🎡</h2>
        <p>Spin the wheel and let us know your thoughts!</p>
      `;
      modal.appendChild(wheelContainer);
  
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
  
      return { overlay, wheel, spinButton };
    }
  
    // Initialize the widget
    function initExitIntentWidget() {
      const { overlay, wheel, spinButton } = createWidget();
  
      let isSpinning = false;
  
      // Detect exit intent
      function detectExit(e) {
        if (e.clientY <= 50 || e.clientX >= window.innerWidth - 50) {
          showWidget();
        }
      }
  
      // Show the widget
      function showWidget() {
        overlay.style.display = 'flex';
      }
  
      // Hide the widget
      function hideWidget() {
        overlay.style.display = 'none';
      }
  
      // Spin the wheel
      function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
  
        const randomRotation = Math.floor(Math.random() * 360) + 1080; // Spin at least 3 full rotations
        wheel.style.transition = 'transform 5s ease-out';
        wheel.style.transform = `rotate(${randomRotation}deg)`;
  
        setTimeout(() => {
          const degrees = randomRotation % 360;
          let selectedOption;
  
          if (degrees < 120) {
            selectedOption = 'Give Feedback';
          } else if (degrees < 240) {
            selectedOption = 'Maybe Later';
          } else {
            selectedOption = 'No Thanks';
          }
  
          if (selectedOption === 'Give Feedback') {
            window.location.href = CONFIG.dashboardUrl;
          } else {
            hideWidget();
          }
  
          isSpinning = false;
        }, 5000);
      }
  
      // Event listeners
      document.addEventListener('mouseleave', detectExit);
      spinButton.addEventListener('click', spinWheel);
    }
  
    // Initialize when the DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initExitIntentWidget);
    } else {
      initExitIntentWidget();
    }
  })();