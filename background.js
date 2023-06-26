/**
 * This get when the browser has loaded a webpage.
 * So it can start soon to check if the page is has adds and block them.
 */
chrome.webNavigation.onCommitted.addListener(function (tab) {
	// Prevents to run if other frames are loading in the page
	if (tab.frameId === 0) {
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
			// Get the current page URL
			const url = tabs[0].url

			/**
			 * Cleaning the URL to get the domain
			 * 1) Remove protocol (http, https, etc.) and subdomain specific subdomain www
			 * 2) Remove path and queries (everything after the first /)
			 */
			const domain = url
				.replace(/^(https?:\/\/)?(www\.)?/, '')
				.split('/')[0]

			// Check if the domain is invalid
			if (!domain || domain.length < 1) {
				return
			}

			// Check if the domain is instagram.com
			if (domain === 'trep.gt') {
				console.log('Trep is running on this page')
				runTrepScript()
				return
			}
		})
	}
})

function runTrepScript() {
	// Inject script from the file into the site
	chrome.tabs.executeScript({
		file: 'trep.js',
	})
	return true
}
