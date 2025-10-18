// Display live time (updates every second)
function updateTime() {
  const timeElement = document.getElementById("current-time");
  const now = new Date();
  timeElement.textContent = now.toLocaleTimeString(); // readable format
}

setInterval(updateTime, 1000);
updateTime();


  