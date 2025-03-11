const LOGIN_URL = 'https://internet.lpu.in/24online/webpages/client.jsp';
// Default interval is 5 minutes, but will be configurable
let CHECK_INTERVAL = 5 * 60 * 1000; 

// Track if a login attempt is currently in progress
let loginInProgress = false;
let intervalId = null; // Store interval ID so we can clear and reset it

// Add message listener for manual login and interval changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'manualLogin') {
        performLogin();
    } else if (message.action === 'updateInterval') {
        // Update the check interval
        const minutes = message.minutes;
        CHECK_INTERVAL = minutes * 60 * 1000;
        
        // Reset the interval timer
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(performLogin, CHECK_INTERVAL);
        
        // Save the interval preference
        chrome.storage.local.set({ checkInterval: minutes });
        
        console.log(`Check interval updated to ${minutes} minutes`);
    }
});

// Remove custom popup code
// chrome.action.onClicked.addListener(() => {
//     openCustomPopup();
// });

// Remove the entire openCustomPopup function since it's not needed

async function performLogin() {
    // Prevent multiple simultaneous login attempts
    if (loginInProgress) {
        console.log('Login already in progress, skipping this request');
        return;
    }
    
    loginInProgress = true;
    
    try {
        const data = await chrome.storage.local.get('credentials');
        if (!data.credentials) {
            loginInProgress = false;
            return;
        }

        const { regno, password } = data.credentials;

        const response = await fetch(LOGIN_URL);
        const html = await response.text();

        if (html.includes('logout.jsp')) {
            console.log('Already logged in');
            loginInProgress = false;
            return;
        }

        await chrome.tabs.create({ url: LOGIN_URL, active: false }, async (tab) => {
            try {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: loginToWifi,
                    args: [regno, password]
                });

                // Close the tab after 2 seconds
                setTimeout(() => {
                    // Check if tab still exists before removing
                    chrome.tabs.get(tab.id, function(tabInfo) {
                        // If no error, tab exists and we can remove it
                        if (chrome.runtime.lastError) {
                            console.log('Tab already closed:', chrome.runtime.lastError.message);
                        } else {
                            chrome.tabs.remove(tab.id);
                        }
                        loginInProgress = false;
                    });
                }, 2000);
            } catch (error) {
                console.error('Script execution error:', error);
                loginInProgress = false;
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        loginInProgress = false;
    }
}

function loginToWifi(regno, password) {
    document.querySelector('#agreepolicy')?.click();
    document.querySelector('input[name="username"]').value = regno;
    document.querySelector('input[name="password"]').value = password;
    document.querySelector('#loginbtn')?.click();
}

// Initialize with saved interval or default
async function initializeInterval() {
    try {
        const data = await chrome.storage.local.get('checkInterval');
        if (data.checkInterval) {
            CHECK_INTERVAL = data.checkInterval * 60 * 1000;
            console.log(`Restored check interval: ${data.checkInterval} minutes`);
        } else {
            // Set default interval if not found
            chrome.storage.local.set({ checkInterval: 5 });
        }
        
        // Clear any existing interval
        if (intervalId) {
            clearInterval(intervalId);
        }
        
        // Start the interval
        intervalId = setInterval(performLogin, CHECK_INTERVAL);
    } catch (error) {
        console.error('Error initializing interval:', error);
        // Fallback to default interval
        intervalId = setInterval(performLogin, CHECK_INTERVAL);
    }
}

// Check when extension is first loaded
performLogin();
initializeInterval();