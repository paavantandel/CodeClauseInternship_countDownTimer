let eventDate = null;
let timer = null;

function setEventTime() {
  const input = document.getElementById("event-time").value;
  if (!input) {
    alert("Please select a valid date and time!");
    return;
  }

  eventDate = new Date(input).getTime();

  if (isNaN(eventDate)) {
    alert("Invalid date format!");
    return;
  }

  // Format and display selected date
  const date = new Date(eventDate);
  const formatted = formatDateTime(date);
  document.getElementById("formatted-date").innerText = `Selected Event Time: ${formatted}`;

  if (timer) clearInterval(timer);
  timer = setInterval(updateCountdown, 1000);
  updateCountdown();
}

function updateCountdown() {
  const now = new Date().getTime();

  if (!eventDate || eventDate <= now) {
    document.getElementById("countdown").innerHTML = "<h2>🎉 Event Started or Invalid!</h2>";
    clearInterval(timer);
    return;
  }

  const gap = eventDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);
  const s = Math.floor((gap % minute) / second);

  document.getElementById("days").innerText = d < 10 ? '0' + d : d;
  document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
  document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
  document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;
}

// Format date to dd-mm-yyyy hh:mm
function formatDateTime(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
}
