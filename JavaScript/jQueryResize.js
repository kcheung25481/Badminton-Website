$(document).ready(function () {
    // Execute function when zoomIn button is clicked
    $("#zoomIn").on("click", function () {
        // Increase all images in the container by 75px with a fast animation
        $(".grid-container img").animate({ width: "+=75", height: "+=75" }, "fast");
        // Increase all text in the container's font by 2 with a fast animation
        $(".grid-container p, .grid-container h1").animate({ "font-size": "+=4" }, "fast");
    });

    // Execute function when zoomOut button is clicked
    $("#zoomOut").on("click", function () {
        // Decrease all images in the container by 75px with a fast animation
        $(".grid-container img").animate({ width: "-=75", height: "-=75" }, "fast");
        // Decrease all text in the container's font by 4 with a fast animation
        $(".grid-container p, .grid-container h1").animate({ "font-size": "-=4" }, "fast");
    });
});