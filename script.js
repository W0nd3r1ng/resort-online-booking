// Function to handle scroll highlight effect
function handleScrollHighlight() {
    const reviewsSection = document.querySelector('.reviews-section');
    const sectionTop = reviewsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // Add 'visible' class when section is in viewport
    if (sectionTop < windowHeight * 0.75) {
        reviewsSection.classList.add('visible');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollHighlight);

// Check on initial load
handleScrollHighlight();

// Background Slideshow
const hero = document.querySelector('.hero');
let currentImage = 1;
const totalImages = 7;

function changeBackground() {
    currentImage = currentImage % totalImages + 1;
    hero.style.backgroundImage = `url('images/VillaEster${currentImage}.jpg')`;
}

// Change background every 5 seconds
setInterval(changeBackground, 3000);

// Modal logic for booking
const openBookingModalBtn = document.getElementById('open-booking-modal');
const bookingModal = document.getElementById('booking-modal');
const closeBookingModalBtn = document.getElementById('close-booking-modal');
const modalCancelBtn = document.getElementById('modal-cancel-btn');

function openBookingModal() {
    bookingModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeBookingModal() {
    bookingModal.style.display = 'none';
    document.body.style.overflow = '';
}
if (openBookingModalBtn && bookingModal && closeBookingModalBtn) {
    openBookingModalBtn.addEventListener('click', openBookingModal);
    closeBookingModalBtn.addEventListener('click', closeBookingModal);
}
if (modalCancelBtn) {
    modalCancelBtn.addEventListener('click', closeBookingModal);
}
// Optional: Close modal when clicking outside content
bookingModal && bookingModal.addEventListener('click', function(e) {
    if (e.target === bookingModal) closeBookingModal();
});

document.addEventListener('DOMContentLoaded', function() {
  // Main booking form (on page)
  const bookingForm = document.querySelector('.booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Collect form data from visible fields
      const name = 'Guest'; // No name field in this form, use placeholder or add a field if needed
      const groupSize = parseInt(document.getElementById('guests').value, 10);
      // Use schedule-date for daytour, checkin-date for overnight
      let date = '';
      const bookingType = document.getElementById('booking-type').value;
      if (bookingType === 'daytour') {
        date = document.getElementById('schedule-date').value;
      } else if (bookingType === 'overnight') {
        date = document.getElementById('checkin-date').value;
      }
      const occasion = '';
      const preferences = [bookingType]; // Use booking type as a preference

      const bookingData = {
        name,
        groupSize,
        date,
        occasion,
        preferences
      };

      try {
        const response = await fetch('http://localhost:3001/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        });
        const result = await response.json();
        if (result.success) {
          alert('Booking successful! Your booking ID is: ' + result.bookingId);
        } else {
          alert('Booking failed: ' + (result.error || 'Unknown error'));
        }
      } catch (err) {
        alert('Error connecting to booking server.');
        console.error(err);
      }
    });
  }

  // Modal booking form (Quick Booking)
  const modalBookingForm = document.querySelector('.modal-booking-form');
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      // Collect modal form data
      const name = document.getElementById('modal-full-name').value;
      const groupSize = parseInt(document.getElementById('modal-adults').value || '1', 10) + parseInt(document.getElementById('modal-children').value || '0', 10);
      let date = '';
      const bookingType = document.getElementById('modal-booking-type').value;
      if (bookingType === 'daytour') {
        date = document.getElementById('modal-schedule-date').value;
      } else if (bookingType === 'overnight') {
        date = document.getElementById('modal-checkin-date').value;
      }
      const occasion = document.getElementById('modal-special-requests').value || '';
      const preferences = [bookingType, document.getElementById('modal-cottage-type').value];

      const bookingData = {
        name,
        groupSize,
        date,
        occasion,
        preferences
      };

      try {
        const response = await fetch('http://localhost:3001/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        });
        const result = await response.json();
        if (result.success) {
          alert('Booking successful! Your booking ID is: ' + result.bookingId);
        } else {
          alert('Booking failed: ' + (result.error || 'Unknown error'));
        }
      } catch (err) {
        alert('Error connecting to booking server.');
        console.error(err);
      }
    });
  }
}); 