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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    updateEventCountdowns();
  });
} else {
  updateCountdown();
  updateEventCountdowns();
}
