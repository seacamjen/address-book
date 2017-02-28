//Business Logic
function Contact(first, last, street, city, state) {
  this.firstName = first;
  this.lastName = last;
  this.street = street;
  this.city = city;
  this.state = state;
  this.addresses = [];
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}


Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}


function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}
//User Interface
$(document).ready(function() {

  $("#add-address").click(function() {
    $("#otherAddressInput").append('<div class="other-new-address">' +
    '<div class="form-group">' +
    '<label for="new-street">Other Street</label>' +
    '<input type="text" class="form-control new-street">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="new-city"> Other City</label>' +
    '<input type="text" class="form-control new-city">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="new-state">Other State</label>' +
    '<input type="text" class="form-control new-state">' +
    '</div>' +
    '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedStreet = $("input.home-street").val();
    var inputtedCity = $("input.home-city").val();
    var inputtedState = $("input.home-state").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedStreet, inputtedCity, inputtedState);

    $(".other-new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      console.log(newAddress)
      newContact.addresses.push(newAddress);

      $(".other-new-address").each(function(){
        $(this).remove();
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".home-street").text(newContact.street);
      $(".home-city").text(newContact.city);
      $(".home-state").text(newContact.state);
      $("ul#otherAddresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#otherAddresses").append("<li>" + address.fullAddress() + "</li>");

      
      });
      });

      resetFields();

    });
  });
});
