window.onscroll = function () {
    myFunction();
  };
  
  // Get the header
  var header = document.getElementById("myHeader");
  
  // Get the offset position of the navbar
  var sticky = header.offsetTop;
  
  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  
  //change navbar height function
  var open = false;
  var navbar = document.getElementsByClassName("navbar");
  toggler.addEventListener("click", function () {
    open = !open;
    console.log(logo);
    if (open) {
      navbar.classList.add("nav-full");
    } else {
      navbar.classList.remove("nav-toggler-alt");
    }
  });