// Chart instance references
let sortChartInstance = null;
let searchChartInstance = null;
let membershipChartInstance = null;

// Common chart styling configurations
const chartColors = {
    bubble: {
        bg: 'rgba(236, 72, 153, 0.4)', // Accent pink
        border: 'rgb(236, 72, 153)'
    },
    merge: {
        bg: 'rgba(20, 184, 166, 0.4)', // Accent teal
        border: 'rgb(20, 184, 166)'
    },
    quick: {
        bg: 'rgba(124, 58, 237, 0.4)', // Accent violet
        border: 'rgb(124, 58, 237)'
    },
    linear: {
        bg: 'rgba(239, 68, 68, 0.4)', // Red
        border: 'rgb(239, 68, 68)'
    },
    binary: {
        bg: 'rgba(59, 130, 246, 0.4)', // Blue
        border: 'rgb(59, 130, 246)'
    },
    list: {
        bg: 'rgba(236, 72, 153, 0.4)', // Pink
        border: 'rgb(236, 72, 153)'
    },
    set: {
        bg: 'rgba(16, 185, 129, 0.4)', // Emerald Green
        border: 'rgb(16, 185, 129)'
    }
};

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false // We will use labels on the axes or simple tooltips
        },
        tooltip: {
            backgroundColor: 'rgba(9, 10, 15, 0.9)',
            titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
            bodyFont: { family: 'JetBrains Mono', size: 12 },
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== undefined) {
                        label += context.parsed.y.toFixed(5) + ' ms';
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
                drawBorder: false
            },
            ticks: {
                color: '#a0aec0',
                font: { family: 'Outfit', size: 13, weight: '600' }
            }
        },
        y: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
                drawBorder: false
            },
            ticks: {
                color: '#a0aec0',
                font: { family: 'JetBrains Mono', size: 11 },
                callback: function(value) {
                    return value.toFixed(4) + ' ms';
                }
            },
            title: {
                display: true,
                text: 'Execution Time (milliseconds)',
                color: '#a0aec0',
                font: { family: 'Outfit', size: 12 }
            }
        }
    }
};

/**
 * Initializes or updates the Sorting Comparison Bar Chart
 */
function updateSortChart(bubbleTimeMs, mergeTimeMs, quickTimeMs) {
    const ctx = document.getElementById('sortChart').getContext('2d');
    
    // Destroy previous instance if it exists
    if (sortChartInstance) {
        sortChartInstance.destroy();
    }
    
    sortChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Bubble Sort', 'Merge Sort', 'Quick Sort'],
            datasets: [{
                label: 'Execution Time',
                data: [bubbleTimeMs, mergeTimeMs, quickTimeMs],
                backgroundColor: [
                    chartColors.bubble.bg,
                    chartColors.merge.bg,
                    chartColors.quick.bg
                ],
                borderColor: [
                    chartColors.bubble.border,
                    chartColors.merge.border,
                    chartColors.quick.border
                ],
                borderWidth: 1.5,
                borderRadius: 6,
                barPercentage: 0.5
            }]
        },
        options: commonOptions
    });
}

/**
 * Initializes or updates the Searching Comparison Bar Chart
 */
function updateSearchChart(linearTimeMs, binaryTimeMs) {
    const ctx = document.getElementById('searchChart').getContext('2d');
    
    if (searchChartInstance) {
        searchChartInstance.destroy();
    }
    
    searchChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Linear Search', 'Binary Search'],
            datasets: [{
                label: 'Execution Time',
                data: [linearTimeMs, binaryTimeMs],
                backgroundColor: [
                    chartColors.linear.bg,
                    chartColors.binary.bg
                ],
                borderColor: [
                    chartColors.linear.border,
                    chartColors.binary.border
                ],
                borderWidth: 1.5,
                borderRadius: 6,
                barPercentage: 0.4
            }]
        },
        options: commonOptions
    });
}

/**
 * Initializes or updates the Membership Comparison Bar Chart
 */
function updateMembershipChart(listTimeMs, setTimeMs) {
    const ctx = document.getElementById('membershipChart').getContext('2d');
    
    if (membershipChartInstance) {
        membershipChartInstance.destroy();
    }
    
    membershipChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['List Membership', 'Set Membership'],
            datasets: [{
                label: 'Benchmark Time',
                data: [listTimeMs, setTimeMs],
                backgroundColor: [
                    chartColors.list.bg,
                    chartColors.set.bg
                ],
                borderColor: [
                    chartColors.list.border,
                    chartColors.set.border
                ],
                borderWidth: 1.5,
                borderRadius: 6,
                barPercentage: 0.4
            }]
        },
        options: commonOptions
    });
}
