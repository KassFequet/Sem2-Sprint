// at the press of the locations button, show a list of locations under the the button in <p> with id locations
document.addEventListener('DOMContentLoaded', function () {
  const locationsButton = document.getElementById('locationsButton');
  const locationsParagraph = document.getElementById('locations');

  locationsButton.addEventListener('click', function () {
    // Toggle the visibility of the locations paragraph
    locationsParagraph.innerHTML =
      '<ul><li>123 Water St.</li><li>321 Bean Blvd.</li><li>789 Espresso Ave.</li></ul>';
  });
});
