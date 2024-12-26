const hideNotifications = async () => {
  console.log("hideNotifications running...");
  const notifications = document.querySelector(".notifications");
  setTimeout(() => {
    notifications.classList.remove("active");
  }, 5000);
};

hideNotifications();
