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

  function calculateDaysUntil(targetDate) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetRaw = new Date(targetDate);
    const target = new Date(
      targetRaw.getFullYear(),
      targetRaw.getMonth(),
      targetRaw.getDate()
    );
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
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

  // Update every hour
  setInterval(updateAllCountdowns, 3600000);
}

function updateCardTimes() {
  const timeElements = document.querySelectorAll('.card-time[data-date], .news-time[data-date]');

  function calculateDaysAgo(dateStr) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetRaw = new Date(dateStr);
    const target = new Date(
      targetRaw.getFullYear(),
      targetRaw.getMonth(),
      targetRaw.getDate()
    );
    const diffTime = today.getTime() - target.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  function updateAllTimes() {
    timeElements.forEach((element) => {
      const dateStr = element.getAttribute('data-date');
      if (!dateStr) return;
      const days = calculateDaysAgo(dateStr);
      if (days === 0) {
        element.textContent = 'TODAY';
      } else if (days === 1) {
        element.textContent = '1 DAY AGO';
      } else {
        element.textContent = `${days} DAYS AGO`;
      }
    });
  }

  updateAllTimes();
  setInterval(updateAllTimes, 3600000);
}

function setupTrailerModal() {
  const modal = document.getElementById('trailerModal');
  const btn = document.getElementById('trailerBtn');
  const closeBtn = document.querySelector('.modal-close');
  const iframe = document.getElementById('trailerVideo');

  if (!modal || !btn || !closeBtn || !iframe) return;

  // Open modal
  btn.addEventListener('click', () => {
    modal.classList.add('show');
    const currentSrc = iframe.src;
    if (!currentSrc.includes('autoplay=1')) {
      iframe.src = currentSrc.includes('?')
        ? currentSrc + '&autoplay=1'
        : currentSrc + '?autoplay=1';
    }
  });

  const closeModal = () => {
    modal.classList.remove('show');
    const originalSrc = iframe.src
      .replace('&autoplay=1', '')
      .replace('?autoplay=1', '');
    iframe.src = originalSrc;
  };

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

function setupNotifyModal() {
  const modal = document.getElementById('notifyModal');
  const btn = document.getElementById('notifyBtn');
  const closeBtn = modal ? modal.querySelector('.modal-close') : null;
  const form = document.getElementById('notifyForm');
  const emailInput = document.getElementById('notifyEmail');
  const messageEl = document.getElementById('notifyMessage');

  if (!modal || !btn || !closeBtn || !form || !emailInput || !messageEl) return;

  const openModal = () => {
    modal.classList.add('show');
    messageEl.textContent = '';
    emailInput.value = '';
    emailInput.focus();
  };

  const closeModal = () => {
    modal.classList.remove('show');
  };

  btn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

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
    updateCardTimes();
    setupTrailerModal();
    setupNotifyModal();
  });
} else {
  updateCountdown();
  updateEventCountdowns();
  updateCardTimes();
  setupTrailerModal();
  setupNotifyModal();
}


