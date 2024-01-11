$('document').ready(() => {
  const list = [];
  const listOfNames = [];
  $('input').click(function (e) {
    if (e.currentTarget.checked) {
      list.push(e.currentTarget.dataset.id);
      listOfNames.push(e.currentTarget.dataset.name);
    }
    if (!e.currentTarget.checked) {
      list.splice(list.indexOf(e.currentTarget.dataset.id), 1);
      listOfNames.splice(listOfNames.indexOf(e.currentTarget.dataset.name), 1);
    }
    $('DIV.amenities H4').text(listOfNames.join());
  });
});
