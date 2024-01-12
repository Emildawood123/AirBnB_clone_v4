$('document').ready(() => {
  const listOfNamesOfA = [];
  const listOfNamesOfS = [];
  const listOfNamesOfC = [];
  let a_name;
  const url = 'http://0.0.0.0:5001/api/v1/status/';
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
  revShow();
});
function searchpa () {
  const url_p = 'http://0.0.0.0:5001/api/v1/places_search/'
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
                                  '_r" class="review">Reviews </span><span id="' +
                                  response[i].id +
                                  '" onclick="revShow(this)"' +
                                  '>show</span></h2><ul id="' +
                                  response[i].id +
                                  '_s"></ul></div></article>');
      }
    }
  });
}
function revShow (obj) {
  let date;
  if (obj === undefined) {
    return;
  }
  if (obj.textContent === 'show') {
    obj.textContent = 'hide';
    $.get('http://0.0.0.0:5001/api/v1/places/' + obj.id + '/reviews', (data, st) => {
      if (st === 'OK') {
        $('#' + obj.id + '_r').text(data.length + ' Reviews ');
        for (let i = 0; i < data.length; i++) {
          date = new Date(data[i].created_at);
          if (data[i].user_id) {
            $.get('http://0.0.0.0:5001/api/v1/users/' + data[i].user_id, (res, stt) => {
              if (stt === 'OK') {
                $('#' + obj.id + '_s').append('<li><h3>From ' +
                res.first_name +
                res.last_name +
                'the ' + dayth(date.getDate()) +
                ' ' + date.getMonth() +
                ' ' + date.getFullYear() +
                '</h3><p>' +
                response[i].text +
                '</p></li>');
              }
            });
          }
        }
      }
    });
  } else {
    obj.textContent = 'show';
    $('#' + obj.id + '_r').html(' Reviews ');
    $('#' + obj.id + '_s').empty();
  }
}
const dayth = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};
