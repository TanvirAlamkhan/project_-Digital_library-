// Librarian Dashboard JavaScript

// Global variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let chart = null;

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    initializeCalendar();
    initializeChart();
    startAutoRefresh();
});

// Initialize dashboard components
function initializeDashboard() {
    console.log('Initializing Librarian Dashboard...');
    
    // Set current date for date inputs
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (input.id === 'borrowDate' || input.id === 'actualReturnDate') {
            input.value = today;
        }
    });
    
    // Set default due date (30 days from today)
    const dueDateInput = document.getElementById('returnDate');
    if (dueDateInput) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        dueDateInput.value = dueDate.toISOString().split('T')[0];
    }
    
    // Initialize tooltips and other UI enhancements
    initializeTooltips();
}

// Setup event listeners
function setupEventListeners() {
    // Modal close events
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case 'n':
                    event.preventDefault();
                    openAddBookModal();
                    break;
                case 'm':
                    event.preventDefault();
                    openMemberModal();
                    break;
                case 'b':
                    event.preventDefault();
                    openBorrowModal();
                    break;
                case 'r':
                    event.preventDefault();
                    openReturnModal();
                    break;
            }
        }
    });
}

// Request Management Functions
function refreshPendingRequests() {
    showToast('Refreshing pending requests...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showToast('Pending requests updated successfully!', 'success');
        // Here you would typically update the DOM with new data
    }, 1000);
}

function approveRequest(requestId) {
    showToast(`Request ${requestId} approved successfully!`, 'success');
    
    // Remove the request item from DOM
    const requestItem = event.target.closest('.request-item');
    if (requestItem) {
        requestItem.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            requestItem.remove();
        }, 300);
    }
}

function denyRequest(requestId) {
    showToast(`Request ${requestId} denied.`, 'warning');
    
    // Remove the request item from DOM
    const requestItem = event.target.closest('.request-item');
    if (requestItem) {
        requestItem.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            requestItem.remove();
        }, 300);
    }
}

// Activity Management
function viewAllActivity() {
    showToast('Opening activity log...', 'info');
    // Navigate to full activity page or open modal
}

function markAllAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
    });
    showToast('All notifications marked as read!', 'success');
}

function markAsRead(notificationId) {
    const notification = event.target.closest('.notification-item');
    if (notification) {
        notification.classList.remove('unread');
        showToast('Notification marked as read!', 'success');
    }
}

// Quick Actions
function openAddBookModal() {
    document.getElementById('addBookModal').style.display = 'block';
    document.getElementById('bookTitle').focus();
}

function openMemberModal() {
    document.getElementById('memberModal').style.display = 'block';
    document.getElementById('memberName').focus();
}

function openBorrowModal() {
    document.getElementById('borrowModal').style.display = 'block';
    document.getElementById('borrowMember').focus();
}

function openReturnModal() {
    document.getElementById('returnModal').style.display = 'block';
    document.getElementById('returnMember').focus();
}

function generateReport() {
    showToast('Generating report...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showToast('Report generated successfully! Downloading...', 'success');
        // Here you would trigger file download
    }, 2000);
}

function openSettings() {
    showToast('Opening settings...', 'info');
    // Navigate to settings page
}

// Search Functions
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        showToast(`Searching for: ${searchTerm}`, 'info');
        // Implement search functionality
    } else {
        showToast('Please enter a search term', 'warning');
    }
}

// History Management
function exportHistory() {
    showToast('Exporting borrowing history...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        showToast('History exported successfully!', 'success');
        // Trigger file download
    }, 1500);
}

// Overdue Management
function sendReminders() {
    const overdueItems = document.querySelectorAll('.overdue-item');
    const count = overdueItems.length;
    
    showToast(`Sending reminders to ${count} members...`, 'info');
    
    setTimeout(() => {
        showToast(`Reminders sent to ${count} members successfully!`, 'success');
    }, 2000);
}

function contactMember(memberName) {
    showToast(`Contacting ${memberName}...`, 'info');
    // Implement contact functionality (phone, email, etc.)
}

function emailMember(memberName) {
    showToast(`Sending email to ${memberName}...`, 'info');
    // Implement email functionality
}

// Calendar Functions
function initializeCalendar() {
    updateCalendar();
}

function updateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Update month display
    document.getElementById('current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day header';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if it's today
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        // Add some sample events (you would get this from your data)
        if (day === 15 || day === 22) {
            dayElement.classList.add('event');
            dayElement.title = 'Library Event';
        }
        
        dayElement.addEventListener('click', () => {
            showToast(`Selected: ${monthNames[currentMonth]} ${day}, ${currentYear}`, 'info');
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function addEvent() {
    showToast('Add event functionality coming soon!', 'info');
}

// Chart Functions
function initializeChart() {
    const ctx = document.getElementById('borrowingChart');
    if (!ctx) return;
    
    // Simple chart using canvas (you can replace with Chart.js or similar)
    const canvas = ctx;
    const context = canvas.getContext('2d');
    
    // Sample data
    const data = [12, 19, 15, 25, 22, 30, 28];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart
    const maxValue = Math.max(...data);
    const barWidth = canvas.width / data.length - 10;
    const barHeight = canvas.height - 40;
    
    context.fillStyle = '#667eea';
    data.forEach((value, index) => {
        const height = (value / maxValue) * barHeight;
        const x = index * (barWidth + 10) + 5;
        const y = canvas.height - height - 20;
        
        context.fillRect(x, y, barWidth, height);
        
        // Draw value
        context.fillStyle = '#2c3e50';
        context.font = '12px Arial';
        context.textAlign = 'center';
        context.fillText(value, x + barWidth / 2, y - 5);
        context.fillStyle = '#667eea';
    });
    
    // Draw labels
    context.fillStyle = '#6c757d';
    context.font = '10px Arial';
    context.textAlign = 'center';
    labels.forEach((label, index) => {
        const x = index * (barWidth + 10) + 5 + barWidth / 2;
        context.fillText(label, x, canvas.height - 5);
    });
}

function updateChart(period) {
    showToast(`Updating chart for ${period}...`, 'info');
    
    // Simulate chart update
    setTimeout(() => {
        initializeChart();
        showToast('Chart updated successfully!', 'success');
    }, 500);
}

// Modal Functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Form Submission Functions
function saveBook() {
    const form = document.getElementById('addBookForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!formData.get('bookTitle') || !formData.get('bookAuthor') || !formData.get('bookIsbn')) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    showToast('Saving book...', 'info');
    
    // Simulate save process
    setTimeout(() => {
        showToast('Book saved successfully!', 'success');
        closeModal('addBookModal');
        form.reset();
    }, 1000);
}

function saveMember() {
    const form = document.getElementById('memberForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!formData.get('memberName') || !formData.get('memberEmail') || !formData.get('memberPhone')) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    showToast('Registering member...', 'info');
    
    // Simulate registration process
    setTimeout(() => {
        showToast('Member registered successfully!', 'success');
        closeModal('memberModal');
        form.reset();
    }, 1000);
}

function processBorrow() {
    const form = document.getElementById('borrowForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!formData.get('borrowMember') || !formData.get('borrowBook') || !formData.get('borrowDate') || !formData.get('returnDate')) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    showToast('Processing borrow...', 'info');
    
    // Simulate borrow process
    setTimeout(() => {
        showToast('Book borrowed successfully!', 'success');
        closeModal('borrowModal');
        form.reset();
    }, 1000);
}

function processReturn() {
    const form = document.getElementById('returnForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!formData.get('returnMember') || !formData.get('returnBook') || !formData.get('actualReturnDate')) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    showToast('Processing return...', 'info');
    
    // Simulate return process
    setTimeout(() => {
        showToast('Book returned successfully!', 'success');
        closeModal('returnModal');
        form.reset();
    }, 1000);
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Utility Functions
function initializeTooltips() {
    // Add tooltips to elements with title attributes
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = event.target.title;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    
    event.target.tooltip = tooltip;
}

function hideTooltip(event) {
    if (event.target.tooltip) {
        event.target.tooltip.remove();
        event.target.tooltip = null;
    }
}

function startAutoRefresh() {
    // Auto refresh stats every 5 minutes
    setInterval(() => {
        console.log('Auto refreshing dashboard data...');
        // Implement auto refresh logic here
    }, 5 * 60 * 1000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }
    
    @keyframes toastSlideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .tooltip {
        animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.librarianDashboard = {
    refreshPendingRequests,
    approveRequest,
    denyRequest,
    viewAllActivity,
    markAllAsRead,
    markAsRead,
    openAddBookModal,
    openMemberModal,
    openBorrowModal,
    openReturnModal,
    generateReport,
    openSettings,
    performSearch,
    exportHistory,
    sendReminders,
    contactMember,
    emailMember,
    previousMonth,
    nextMonth,
    addEvent,
    updateChart,
    closeModal,
    saveBook,
    saveMember,
    processBorrow,
    processReturn,
    showToast
}; 