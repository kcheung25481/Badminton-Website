$(document).ready(function () {
    // Execute function after every user input keystroke
    $("#search").on("keyup", function () {
        // Turn the value of the user input to lowercase to make it case insensitive
        var value = $(this).val().toLowerCase();
        // Select all rows after the first one in the #Resources table
        $("#Resources tbody tr:gt(0)").filter(function () {
            // Toggle visibility of rows containing the text inputted by the user
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)            
        });
    });
});
