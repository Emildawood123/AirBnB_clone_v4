$('document').ready(() => {
  const listOfNamesOfA = [];
  const listOfNamesOfS = [];
  const listOfNamesOfC = [];
  let a_name;
  const url = 'http://192.168.1.7:5001/api/v1/status/';
  $('.amenities input[type=checkbox]').change (function () {
    a_name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      listOfNamesOfA.push(a_name);
    } else {
	    listOfNamesOfA = listOfNamesOfA.filter(names => names !== a_name);
    }
    $('.amenities h4').text(listOfNamesOfA.join(', '));
  });
  $('.state_input input[type=checkbox]').change (function () {
    a_name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      listOfNamesOfS.push(a_name);
    } else {
	    listOfNamesOfS = listOfNamesOfS.filter(names => names !== a_name);
    }
    $('.locations h4').text(listOfNamesOfS.join(', '));
  });
  $('.city_input input[type=checkbox]').change (function () {
    a_name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      listOfNamesOfC.push(a_name);
    } else {
	    listOfNamesOfC = listOfNamesOfC.filter(names => names !== a_name);
    }
    $('.locations h4').text(listOfNamesOfC.join(', '));
  });
  $.get(url, (response) => {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  searchpa();
});
function searchpa () {
  const url_p = 'http://192.168.1.7:5001/api/v1/places_search/'
  $.ajax({
    url: url_p,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        $('section.places').append('<article><div class="title_box"><h2>'+
                                  response[i].name +
                                  '</h2><div class="price_by_night">'+
                                  response[i].price_by_night +
                                  '</div></div><div class="information"><div class="max_guest">' +
                                  response[i].max_guest +
                                  ' Guests</div><div class="number_rooms">' +
                                  response[i].number_rooms +
                                  ' Bedrooms</div><div class="number_bathrooms">' +
                                  response[i].number_bathrooms +
                                  ' Bathroom</div></div><div class="description">' +
                                  response[i].description +
                                  '</div><div class="reviews"><h2><span id="' +
                                  response[i].id +
                                  '" class="review">Reviews</span><span id="' +
                                  response[i].id +
                                  '" onclick="revShow(this)"' +
                                  '> show</span></h2><ul id="' +
                                  response[i].id +
                                  '"></ul></div></article>');
      }
    }
  });
}
function revShow (obj) {
  if (obj === undefined) {
    return;
  }
  if (obj.textContent === ' show') {
    obj.textContent = ' hide';
    $.get(`http://192.168.1.7:5001/api/v1/places/${obj.id}/reviews`, (response) => {
      if (response.status === 'OK') {
        $(`#${obj.id}n`).html(response.length + ' Reviews');
        
      }
    });
  } else {
    obj.textContent = ' show';
    $(`#${obj.id}n`).html('Reviews');
    $(`#${obj.id}r`).empty();
  }
}
