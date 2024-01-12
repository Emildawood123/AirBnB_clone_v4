$('document').ready(() => {
  const listOfNames = [];
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $('input[type=checkbox]').change (function () {
    const a_name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      listOfNames.push(a_name);
    } else {
	    listOfNames = listOfNames.filter(names => names !== a_name);
    }
    $('.amenities h4').text(listOfNames.join(', '));
  });
  $.get(url, (response) => {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
