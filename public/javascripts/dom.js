document.addEventListener("DOMContentLoaded", (event) => {
  const navbarToggleBtn = document.getElementById("navbarToggleBtn");

  navbarToggleBtn.addEventListener("click", function() {


    const navbarCollapse = document.getElementById("navbarSupportedContent");

    navbarCollapse.classList.toggle("show");
  })

})
