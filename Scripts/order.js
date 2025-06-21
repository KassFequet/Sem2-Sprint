// Show locations when the button is clicked
document.addEventListener('DOMContentLoaded', function () {
  const locationsButton = document.getElementById('locationsButton');
  const locationsParagraph = document.getElementById('locations');

  locationsButton.addEventListener('click', function () {
    locationsParagraph.innerHTML =
      '<ul><li>123 Water St.</li><li>321 Bean Blvd.</li><li>789 Espresso Ave.</li></ul>';
  });
});
