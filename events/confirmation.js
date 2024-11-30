const openModal = new Event("openModal");

const modal = document.querySelector("dialog");

const openModalHandler = (e, category) => {
  e.preventDefault();
  console.log("openModal running...");
  console.log(e);
  console.log(category);
  modal.showModal();
};

const closeModal = (e) => {
  console.log("closeModal running...");
};
