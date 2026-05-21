let selectedDepartment = null;

const IT_OPTIONS = [
    { value: 'camera', label: 'Camera' },
    { value: 'speaker', label: 'Speaker' },
    { value: 'lights', label: 'Lights' },
    { value: 'studio', label: 'Studio' }
];

const BMO_OPTIONS = [
    { value: 'room-204', label: 'Room 204' },
    { value: 'room-310', label: 'Room 310' },
    { value: 'room-412', label: 'Room 412' },
    { value: 'event-booking', label: 'Event Booking' }
];

function selectDepartment(dept) {
    selectedDepartment = dept;
    
    // Update UI
    document.querySelectorAll('.dept-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    if (dept === 'IT') {
        document.querySelector('.it-option').classList.add('selected');
    } else {
        document.querySelector('.bmo-option').classList.add('selected');
    }
    
    // Show form
    document.getElementById('ticketForm').style.display = 'block';
    document.getElementById('noSelection').style.display = 'none';
    
    // Update form
    const itemTypeSelect = document.getElementById('itemType');
    const formDescription = document.getElementById('formDescription');
    
    itemTypeSelect.innerHTML = '<option value="">Select type</option>';
    
    const options = dept === 'IT' ? IT_OPTIONS : BMO_OPTIONS;
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        itemTypeSelect.appendChild(option);
    });
    
    formDescription.textContent = dept === 'IT' 
        ? 'Request equipment or studio reservation'
        : 'Request room or event booking';
}

async function submitTicket(event) {
    event.preventDefault();
    
    if (!selectedDepartment) {
        showToast('Please select a department', 'error');
        return;
    }
    
    const ticketData = {
        department: selectedDepartment,
        itemType: document.getElementById('itemType').value,
        requestedBy: document.getElementById('requestedBy').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        duration: document.getElementById('duration').value,
        purpose: document.getElementById('purpose').value
    };
    
    try {
        await createTicket(ticketData);
        showToast('Reservation request submitted successfully!');
        setTimeout(() => {
            window.location.href = 'my-tickets.html';
        }, 1000);
    } catch (error) {
        showToast('Failed to submit ticket. Please try again.', 'error');
    }
}