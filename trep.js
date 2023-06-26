// Save the original order of the rows
let firstTime = true
let originalRows = Array.from(document.querySelectorAll('tbody tr'))

function sortTable(order) {
	if (firstTime) {
		originalRows = Array.from(document.querySelectorAll('tbody tr'))
		firstTime = false
	}
	const rows = Array.from(document.querySelectorAll('tbody tr'))

	// Sort the rows based on the value inside the <b> element
	if (order === 'desc') {
		rows.sort((a, b) => {
			const aValue = parseFloat(
				a.querySelector('b.ng-binding').textContent,
			)
			const bValue = parseFloat(
				b.querySelector('b.ng-binding').textContent,
			)
			return bValue - aValue
		})
	} else if (order === 'asc') {
		rows.sort((a, b) => {
			const aValue = parseFloat(
				a.querySelector('b.ng-binding').textContent,
			)
			const bValue = parseFloat(
				b.querySelector('b.ng-binding').textContent,
			)
			return aValue - bValue
		})
	} else if (order === 'original') {
		// Sort the rows based on their original order
		rows.sort((a, b) => {
			const aIndex = originalRows.indexOf(a)
			const bIndex = originalRows.indexOf(b)
			return aIndex - bIndex
		})
	}

	// Remove the existing rows from the table
	const tableBody = document.querySelector('tbody')
	tableBody.innerHTML = ''

	// Append the sorted rows to the table
	rows.forEach((row) => tableBody.appendChild(row))
}

function resetTable() {
	firstTime = true
	sortIndex = 0
	button.innerText = `Sort Table`
}

// Add a button to the page
const button = document.createElement('button')
button.innerText = 'Sort Table'
button.style.position = 'fixed'
button.style.bottom = '10px'
button.style.left = '10px'
button.style.zIndex = '9999'
document.body.appendChild(button)

// Add event listener to the button
let order = 'original'
let sortIndex = 0
const sequence = ['original', 'desc', 'asc']
button.addEventListener('click', () => {
	// console.log(sortIndex)
	sortTable(sequence[sortIndex])
	button.innerText = `Sort Table (${sequence[sortIndex]})`
	sortIndex++
	if (sortIndex > 2) {
		sortIndex = 0
	}
})

const path = window.location.pathname + window.location.hash
// console.log('PATH', path)
let currentPath = path
setInterval(() => {
	if (currentPath !== window.location.pathname + window.location.hash) {
		currentPath = window.location.pathname + window.location.hash
		resetTable()
		console.log('reset')
	}
}, 500)
