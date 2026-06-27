self.addEventListener("message", function(event) {
  if (!event.data || event.data.type !== "SCHEDULE_REMINDER") return;
  var time = event.data.time || "20:00";
  var parts = time.split(":");
  var hours = parseInt(parts[0], 10);
  var mins = parseInt(parts[1], 10);
  var now = new Date();
  var next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, mins, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  var delay = next.getTime() - now.getTime();
  setTimeout(function() {
    self.registration.showNotification("UrgeTrack", {
      body: "Time to log your tics for today.",
      icon: "/icon-192.png"
    });
  }, delay);
});
