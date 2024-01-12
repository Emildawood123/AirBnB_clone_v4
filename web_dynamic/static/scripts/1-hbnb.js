$('document').ready(() => {
  const listOfNames = [];
  $('input[type=checkbox]').change (function () {
    const a_name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      listOfNames.push(a_name);
    } else {
	    listOfNames = listOfNames.filter(names => names !== a_name);
    }
    $('.amenities h4').text(listOfNames.join(', '));
  });
});
