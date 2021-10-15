$(() => {
  const $newReservationForm = $(`
  <form action="/api/reservations" method="post" id="new-reservation-form" class="new-reservation-form">
      <div class="new-reservation-form__field-wrapper">
        <label for="new-reservation-form__title">Start Date</label>
        <input type="date" name="start_date" id="new-reservation-form__title">
        <label for="new-reservation-form__title">End Date</label>
        <input type="date" name="end_date" id="new-reservation-form__title">
      </div>

      <div class="new-reservation-form__field-wrapper">
          <button>Create</button>
          <a id="reservation-form__cancel" href="#">Cancel</a>
      </div>
        
    </form>
  `);
  
  window.$newReservationForm = $newReservationForm;

  $newReservationForm.on('submit', function(event) {
    event.preventDefault();

    views_manager.show('none');

    const data = $(this).serialize();
    submitReservation(data)
      .then(() => {
        views_manager.show('listings');
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('listings');
      });
  });

  $('body').on('click', '#reservation-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
  
});