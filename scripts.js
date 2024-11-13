$(document).ready(function() {
  let itemsData = {};        // Stores JSON data
  let currentCategory = null; // Current selected category
  let currentIndex = 0;       // Current index of item in category
  let currentCount = 0;       // Number of items added
  let maxLimit = 5;           // Default max limit (small)
  let totalPrice = 0;         // Total price of added items

  // Load items data from JSON file
  $.getJSON("items.json", function(data) {
    itemsData = data.products;
  });

  // Set up size selection functionality
  $(".purple-box").click(function() {
    maxLimit = $(this).data("max"); // Update max limit based on selected size
    updateCartSummary();             // Keep item count continuity
  });
  
  // Display current item based on category and index
  function displayItem(category, index) {
    const item = itemsData[category][index];
    $("#product-image").attr("src", item.picture);
    $(".price-tag-text").text(`${item.price} $`);
  }

  // Handle category selection without auto-adding first item
  $(".gift-items-container button").click(function() {
    const category = $(this).find(".white-box-heading").text().toLowerCase();
     // Reset all buttons to the default background color
     $(".gift-items-container .btn").css("background", "#B6BBB1");

     // Set the background color for the selected category button
     $(this).find(".btn").css("background", "#87e432");
    if (itemsData[category]) {
      currentCategory = category;
      currentIndex = 0;          // Reset index for the new category
      displayItem(currentCategory, currentIndex); // Show first item without adding
    }
  });

  // Navigate through items within a selected category
  $("#prev-item").click(function() {
    if (currentCategory && currentIndex > 0) {
      currentIndex--;
      displayItem(currentCategory, currentIndex);
    }
  });

  $("#next-item").click(function() {
    if (currentCategory && currentIndex < itemsData[currentCategory].length - 1) {
      currentIndex++;
      displayItem(currentCategory, currentIndex);
    }
  });
  $(".vertical-centered-text-container .nested-content-container1").click(function() {
    if (currentCount < maxLimit) {
      const item = itemsData[currentCategory][currentIndex];
      currentCount++;
      totalPrice += item.price;

      // Add item image to inside-gifting-box and custom-letter-container2-mobile with fixed size
      $(".inside-gifting-box").append(`<img src="${item.picture}" class="gifting-item-image" style="width: 120px; height: 120px;"/>`);
      $(".custom-letter-container2-mobile").append(`<img src="${item.picture}" class="gifting-item-image" style="width: 50px; height: 50px;"/>`);

      // Update cart summary and total price
      updateCartSummary();
      updateTotalPrice();
    } else {
      showPopupMessage(`The maximum number of items for this box is ${maxLimit}.`);
    }
  });
  function showPopupMessage(message) {
    $("#popup-text").text(message); // Set the message text
    $("#popup-message").fadeIn(); // Show the pop-up
  }

  // Close button functionality
  $("#close-popup").click(function() {
    $("#popup-message").fadeOut(); // Hide the pop-up when clicking "OK"
  });

  // Update the cart summary display
  function updateCartSummary() {
    $(".warp-text-css").text(`${currentCount}/${maxLimit}`);
  }

  // Update the total price display
  function updateTotalPrice() {
    $(".total-price-text").text(`${totalPrice.toFixed(2)} $`);
  }


  $(".nested-content-container1").click(function() {
    const colorfulBox = $(this).find(".colorful-box-container");

    // Add the 'clicked' class to trigger the animation
    colorfulBox.addClass("clicked");

    // Remove the class after the animation is complete
    setTimeout(function() {
      colorfulBox.removeClass("clicked");
    }, 300); // Match the transition duration
  });

  $("#add-to-cart-btn").click(function() {
    if (currentCount == 0) {
      showPopupMessage(`Please fill your gift first`);
    }
     else{

    
      showPopupMessage(`Your gift successfully added to the cart`);

    // Reset all variables
    currentCount = 0;
    totalPrice = 0;

    // Clear the items from the gift box and custom letter container
    $(".inside-gifting-box").empty();
    $(".custom-letter-container2-mobile").empty();

    // Reset the cart summary and total price display
    updateCartSummary();
    updateTotalPrice();
     }
  });
});
