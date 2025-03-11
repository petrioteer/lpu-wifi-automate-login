document.getElementById('save').addEventListener('click', () => {
  const regno = document.getElementById('regno').value;
  const password = document.getElementById('password').value;

  if (!regno || !password) {
    alert('Please enter both registration number and password');
    return;
  }

  chrome.storage.local.set({
    credentials: { regno, password }
  }, () => {
    alert('Credentials saved successfully!');
    showReloadSection();
  });
});

document.getElementById('reload').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'manualLogin' });
});

document.getElementById('reset').addEventListener('click', () => {
  if (confirm('Are you sure you want to reset your credentials?')) {
    chrome.storage.local.remove('credentials', () => {
      showLoginSection();
    });
  }
});

// Add this to your initializeIntervalControls function
function updateSliderBackground(slider) {
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #e8eaed ${value}%, #5f6368 ${value}%)`;
}

// Initialize interval controls and load saved interval
function initializeIntervalControls() {
  const intervalValues = [1, 5, 15, 30, 60]; // 1min, 5min, 15min, 30min, 1hr
  const slider = document.getElementById('interval-slider');
  
  // Load saved interval
  chrome.storage.local.get('checkInterval', (data) => {
    const savedInterval = data.checkInterval || 5;
    // Find the closest value in our predefined intervals
    let sliderIndex = 0;
    let closestDiff = Math.abs(intervalValues[0] - savedInterval);
    
    for (let i = 1; i < intervalValues.length; i++) {
      const diff = Math.abs(intervalValues[i] - savedInterval);
      if (diff < closestDiff) {
        closestDiff = diff;
        sliderIndex = i;
      }
    }
    
    slider.value = sliderIndex;
    updateSliderBackground(slider); // Update background on initialization
  });
  
  // Set up event listener for slider
  slider.addEventListener('input', () => {
    const index = parseInt(slider.value);
    const minutes = intervalValues[index];
    updateInterval(minutes);
    updateSliderBackground(slider); // Update background when slider moves
  });
}

// Function to update interval
function updateInterval(minutes) {
  chrome.runtime.sendMessage({
    action: 'updateInterval',
    minutes: minutes
  });
}

function showReloadSection() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('reloadSection').style.display = 'block';
  // Initialize interval controls when showing reload section
  initializeIntervalControls();
}

function showLoginSection() {
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('reloadSection').style.display = 'none';
  document.getElementById('regno').value = '';
  document.getElementById('password').value = '';
}

// Check if credentials exist on popup open - IMPORTANT: This needs to run when the popup opens
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('credentials', (data) => {
    if (data.credentials && data.credentials.regno && data.credentials.password) {
      showReloadSection();
    } else {
      showLoginSection();
    }
  });
});