function updateCountdown() {
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  let totalSeconds = 31 * 3600 + 20 * 60 + 17;

  setInterval(() => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');

    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 31 * 3600 + 20 * 60 + 17;
  }, 1000);
}

function updateEventCountdowns() {
  const countdownElements = document.querySelectorAll('.event-countdown');
  
  function calculateDaysUntil(targetDate: string): number {
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  function updateAllCountdowns() {
    countdownElements.forEach((element) => {
      const dateStr = element.getAttribute('data-date');
      if (dateStr) {
        const days = calculateDaysUntil(dateStr);
        element.textContent = `${days} ${days === 1 ? 'DAY' : 'DAYS'}`;
      }
    });
  }

  // Update immediately
  updateAllCountdowns();
  
  // Update every hour (3600000 ms)
  setInterval(updateAllCountdowns, 3600000);
}

function setupTrailerModal() {
  const modal = document.getElementById('trailerModal');
  const btn = document.getElementById('trailerBtn');
  const closeBtn = document.querySelector('.modal-close');
  const iframe = document.getElementById('trailerVideo') as HTMLIFrameElement;

  if (!modal || !btn || !closeBtn || !iframe) return;

  // Open modal
  btn.addEventListener('click', () => {
    modal.classList.add('show');
    // Add autoplay parameter when opening
    const currentSrc = iframe.src;
    if (!currentSrc.includes('autoplay=1')) {
      iframe.src = currentSrc.includes('?') 
        ? currentSrc + '&autoplay=1' 
        : currentSrc + '?autoplay=1';
    }
  });

  // Close modal function
  const closeModal = () => {
    modal.classList.remove('show');
    // Stop video by removing and re-adding src
    const originalSrc = iframe.src.replace('&autoplay=1', '').replace('?autoplay=1', '');
    iframe.src = originalSrc;
  };

  // Close on X button click
  closeBtn.addEventListener('click', closeModal);

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    updateEventCountdowns();
    setupTrailerModal();
  });
} else {
  updateCountdown();
  updateEventCountdowns();
  setupTrailerModal();
}
