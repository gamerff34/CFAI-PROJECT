document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Tab Navigation Logic
    // ----------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active classes
            navLinks.forEach(l => l.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding tab pane
            const targetId = link.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // Utility Helpers
    // ----------------------------------------------------
    function generateRandomNumbers(size, min = 1, max = 10000, withDuplicates = false) {
        const arr = [];
        const range = max - min + 1;
        for (let i = 0; i < size; i++) {
            if (withDuplicates) {
                // Duplicate values are more likely by using a smaller value range
                arr.push(Math.floor(Math.random() * (size / 2)) + min);
            } else {
                arr.push(Math.floor(Math.random() * range) + min);
            }
        }
        return arr;
    }

    function parseInputString(str) {
        if (!str || str.trim() === '') return [];
        return str.split(',')
                  .map(x => x.trim())
                  .filter(x => x !== '')
                  .map(x => Number(x))
                  .filter(x => !isNaN(x));
    }

    function showSpinner(button, text = 'Processing...') {
        button.disabled = true;
        button.dataset.originalHtml = button.innerHTML;
        button.innerHTML = `<span class="spinner"></span> ${text}`;
    }

    function hideSpinner(button) {
        button.disabled = false;
        if (button.dataset.originalHtml) {
            button.innerHTML = button.dataset.originalHtml;
        }
    }

    function showError(message) {
        alert(`❌ Error: ${message}`);
    }

    // ----------------------------------------------------
    // Sorting Module
    // ----------------------------------------------------
    const btnGenerateSort = document.getElementById('btn-generate-sort');
    const btnRunSort = document.getElementById('btn-run-sort');
    const sortInput = document.getElementById('sort-input');
    const sortSize = document.getElementById('sort-size');
    const sortResultsCard = document.getElementById('sort-results-card');

    btnGenerateSort.addEventListener('click', () => {
        const size = parseInt(sortSize.value);
        const randomArr = generateRandomNumbers(size);
        sortInput.value = randomArr.join(', ');
    });

    btnRunSort.addEventListener('click', async () => {
        const numbers = parseInputString(sortInput.value);
        if (numbers.length === 0) {
            showError('Please enter some numbers or generate a random list.');
            return;
        }

        showSpinner(btnRunSort, 'Running Algorithms...');
        try {
            const response = await fetch('/api/sort', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ array: numbers })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Server error occurred');
            }

            // Hide placeholder, show results
            sortResultsCard.querySelector('.no-results-placeholder').classList.add('hidden');
            const resultsContent = sortResultsCard.querySelector('.results-content');
            resultsContent.classList.remove('hidden');

            // Render stats
            document.getElementById('sort-winner-name').textContent = data.fastest;
            
            // Format sorted preview
            const sortedArr = data.sorted_array;
            let previewText = '';
            if (sortedArr.length <= 100) {
                previewText = sortedArr.join(', ');
            } else {
                previewText = sortedArr.slice(0, 50).join(', ') + ' ... [truncated] ... ' + sortedArr.slice(-50).join(', ');
            }
            document.getElementById('sort-output-array').textContent = previewText;

            // Runtimes (convert to milliseconds, formatted beautifully)
            const bubbleTime = data.results.bubble_sort.runtime * 1000;
            const mergeTime = data.results.merge_sort.runtime * 1000;
            const quickTime = data.results.quick_sort.runtime * 1000;

            document.querySelector('#row-bubble .runtime').textContent = bubbleTime.toFixed(4) + ' ms';
            document.querySelector('#row-merge .runtime').textContent = mergeTime.toFixed(4) + ' ms';
            document.querySelector('#row-quick .runtime').textContent = quickTime.toFixed(4) + ' ms';

            // Highlight winner in table
            document.querySelectorAll('#sort-results-card tbody tr').forEach(tr => tr.classList.remove('highlight-row'));
            if (data.fastest === 'Bubble Sort') {
                document.getElementById('row-bubble').classList.add('highlight-row');
            } else if (data.fastest === 'Merge Sort') {
                document.getElementById('row-merge').classList.add('highlight-row');
            } else if (data.fastest === 'Quick Sort') {
                document.getElementById('row-quick').classList.add('highlight-row');
            }

            // Render/Update Chart
            updateSortChart(bubbleTime, mergeTime, quickTime);

        } catch (err) {
            showError(err.message);
        } finally {
            hideSpinner(btnRunSort);
        }
    });

    // ----------------------------------------------------
    // Searching Module
    // ----------------------------------------------------
    const btnGenerateSearch = document.getElementById('btn-generate-search');
    const btnRunSearch = document.getElementById('btn-run-search');
    const searchInput = document.getElementById('search-input');
    const searchTarget = document.getElementById('search-target');
    const searchSize = document.getElementById('search-size');
    const searchResultsCard = document.getElementById('search-results-card');

    btnGenerateSearch.addEventListener('click', () => {
        const size = parseInt(searchSize.value);
        const randomArr = generateRandomNumbers(size);
        searchInput.value = randomArr.join(', ');
        
        // Randomly pick a target from the list to make it exist, or occasionally non-existent
        if (Math.random() > 0.2) {
            const randomIndex = Math.floor(Math.random() * size);
            searchTarget.value = randomArr[randomIndex];
        } else {
            searchTarget.value = 99999; // Non-existent element
        }
    });

    btnRunSearch.addEventListener('click', async () => {
        const numbers = parseInputString(searchInput.value);
        const targetVal = searchTarget.value.trim();

        if (numbers.length === 0) {
            showError('Please enter some numbers or generate a random dataset.');
            return;
        }
        if (targetVal === '') {
            showError('Please enter a target element to search for.');
            return;
        }

        showSpinner(btnRunSearch, 'Searching...');
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ array: numbers, target: Number(targetVal) })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Server error occurred');
            }

            // Hide placeholder, show results
            searchResultsCard.querySelector('.no-results-placeholder').classList.add('hidden');
            const resultsContent = searchResultsCard.querySelector('.results-content');
            resultsContent.classList.remove('hidden');

            // Winner & Status
            document.getElementById('search-winner-name').textContent = data.fastest;
            const statusBadge = document.getElementById('search-status-badge');
            if (data.found) {
                statusBadge.textContent = 'Found';
                statusBadge.className = 'status-badge found';
            } else {
                statusBadge.textContent = 'Not Found';
                statusBadge.className = 'status-badge not-found';
            }

            // Render indices
            const linearIdx = data.results.linear_search.index;
            const binaryIdx = data.results.binary_search.index;
            document.getElementById('search-linear-idx').textContent = linearIdx !== -1 ? linearIdx : 'N/A';
            document.getElementById('search-binary-idx').textContent = binaryIdx !== -1 ? binaryIdx : 'N/A';

            // Runtimes (convert to milliseconds)
            const linearTime = data.results.linear_search.runtime * 1000;
            const binaryTime = data.results.binary_search.runtime * 1000;

            document.querySelector('#row-linear .runtime').textContent = linearTime.toFixed(5) + ' ms';
            document.querySelector('#row-binary .runtime').textContent = binaryTime.toFixed(5) + ' ms';

            // Update Chart
            updateSearchChart(linearTime, binaryTime);

        } catch (err) {
            showError(err.message);
        } finally {
            hideSpinner(btnRunSearch);
        }
    });

    // ----------------------------------------------------
    // Membership Module
    // ----------------------------------------------------
    const btnGenerateMembership = document.getElementById('btn-generate-membership');
    const btnRunMembership = document.getElementById('btn-run-membership');
    const membershipInput = document.getElementById('membership-input');
    const membershipTarget = document.getElementById('membership-target');
    const membershipIterations = document.getElementById('membership-iterations');
    const membershipSize = document.getElementById('membership-size');
    const membershipResultsCard = document.getElementById('membership-results-card');

    btnGenerateMembership.addEventListener('click', () => {
        const size = parseInt(membershipSize.value);
        // Generate with duplicate likelihood
        const randomArr = generateRandomNumbers(size, 1, Math.floor(size / 3), true);
        membershipInput.value = randomArr.join(', ');
        
        // Target is selected from the list or outside
        if (Math.random() > 0.1) {
            const randomIndex = Math.floor(Math.random() * size);
            membershipTarget.value = randomArr[randomIndex];
        } else {
            membershipTarget.value = 88888;
        }
    });

    btnRunMembership.addEventListener('click', async () => {
        const numbers = parseInputString(membershipInput.value);
        const targetVal = membershipTarget.value.trim();
        const iterationsVal = parseInt(membershipIterations.value);

        if (numbers.length === 0) {
            showError('Please enter some numbers or generate a random dataset.');
            return;
        }
        if (targetVal === '') {
            showError('Please enter a target element to test membership.');
            return;
        }
        if (isNaN(iterationsVal) || iterationsVal < 1) {
            showError('Please specify a positive number of iterations.');
            return;
        }

        showSpinner(btnRunMembership, 'Benchmarking...');
        try {
            const response = await fetch('/api/membership', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    array: numbers,
                    target: Number(targetVal),
                    iterations: iterationsVal
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Server error occurred');
            }

            // Hide placeholder, show results
            membershipResultsCard.querySelector('.no-results-placeholder').classList.add('hidden');
            const resultsContent = membershipResultsCard.querySelector('.results-content');
            resultsContent.classList.remove('hidden');

            // Winner badge
            document.getElementById('membership-winner-name').textContent = data.fastest;

            // Runtimes (convert to milliseconds)
            const listTime = data.results.list_membership.runtime * 1000;
            const setTime = data.results.set_membership.runtime * 1000;

            // Average time per lookup in nanoseconds: (time in ms * 1,000,000) / iterations
            const listAvgNs = (listTime * 1000000) / data.iterations;
            const setAvgNs = (setTime * 1000000) / data.iterations;

            document.querySelector('#row-list-member .runtime').textContent = listTime.toFixed(4) + ' ms';
            document.querySelector('#row-set-member .runtime').textContent = setTime.toFixed(4) + ' ms';

            document.querySelector('#row-list-member .avg-time').textContent = listAvgNs.toFixed(1) + ' ns';
            document.querySelector('#row-set-member .avg-time').textContent = setAvgNs.toFixed(1) + ' ns';

            // Update Chart
            updateMembershipChart(listTime, setTime);

        } catch (err) {
            showError(err.message);
        } finally {
            hideSpinner(btnRunMembership);
        }
    });
});
