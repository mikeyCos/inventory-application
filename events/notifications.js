const hideNotifications = async () => {
  console.log("hideNotifications running...");
  const notifications = document.querySelector(".notifications");
  setTimeout(() => {
    notifications.classList.remove("active");
  }, 2000);
};

hideNotifications();
