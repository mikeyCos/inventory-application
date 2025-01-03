const hideNotifications = async () => {
  const notifications = document.querySelector(".notifications");
  setTimeout(() => {
    notifications.classList.remove("active");
  }, 500);
};

hideNotifications();
