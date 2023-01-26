// Youtube API Reference: https://developers.google.com/youtube/v3/docs/videos#resource

/* Old template for reference

const videos = [
  {
    title: "Chou Tien Chen vs. Loh Kean Yew Bangkok 2022",
    viewCount: 76000,
    date: "2022-12-07",
    type: "MSingles",
    embedCode: '<iframe width="885" height="498" src="https://www.youtube.com/embed/qasMeMci5SU" title="Chou Tien Chen vs. Loh Kean Yew in high-octane mens singles clash" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
  {
    title: "Lu Guang Zu vs. Shi Yu Qi Australian Open 2022",
    viewCount: 47000,
    date: "2022-11-22",
    type: "MSingles",
    embedCode: '<iframe width="885" height="498" src="https://www.youtube.com/embed/QMqzmTJyIjg" title="An all-Chinese final where Lu Guang Zu opposes Shi Yu Qi" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
  {
    title: "Kim/Jeong vs. Ferdinansyah/Widjaja Australian Open 2022",
    viewCount: 22300,
    date: "2022-11-18",
    type: "XDoubles",
    embedCode: '<iframe width="885" height="498" src="https://www.youtube.com/embed/jKE0PuCnmco" title="Kim/Jeong and Ferdinansyah/Widjaja go the distance in the opening semifinals match" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
  {
    title: "Zheng/Huang vs. Gicquel/Delrue Bangkok 2022",
    viewCount: 28000,
    date: "2022-12-07",
    type: "MDoubles",
    embedCode: '<iframe width="885" height="498" src="https://www.youtube.com/embed/FzyA4jp8nNU" title="Top seeds Zheng/Huang take to the court against Gicquel/Delrue" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
]; */

const videos = [
  {
    title: "Title",
    viewCount: 0,
    date: "date",
    type: "MSingles",
    embedCode: '<iframe width="885" height="498" src="https://www.youtube.com/embed/qasMeMci5SU" title="Chou Tien Chen vs. Loh Kean Yew in high-octane mens singles clash" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
  {
    title: "Title",
    viewCount: 0,
    date: "date",
    type: "MSingles",
    embedCode: '<iframe width="885" height="498" src="https://www.youtube.com/embed/QMqzmTJyIjg" title="An all-Chinese final where Lu Guang Zu opposes Shi Yu Qi" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
  {
    title: "Title",
    viewCount: 0,
    date: "date",
    type: "XDoubles",
    embedCode: '<iframe width="885" height="498" src="https://www.youtube.com/embed/jKE0PuCnmco" title="Kim/Jeong and Ferdinansyah/Widjaja go the distance in the opening semifinals match" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
  {
    title: "Title",
    viewCount: 0,
    date: "date",
    type: "MDoubles",
    embedCode: '<iframe width="885" height="498" src="https://www.youtube.com/embed/FzyA4jp8nNU" title="Top seeds Zheng/Huang take to the court against Gicquel/Delrue" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
];

// Parse through each of the video objects
$.each(videos, function (key, video) {

  // Extract the youtube ID from them embedCode provided in the object by parsing through the src and extracting the 4th element splitting at '/'
  var videoId = $(video.embedCode).attr("src").split("/")[4];
  
  // Access Youtube API using AJAX
  $.ajax({
    // URL with data and key requested
    url: "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=" + videoId + "&key=KEY",
    type: "GET",

    // On recieving the data, amend the video object array with the recieved data
    success: function (data) {
      video.title = data.items[0].snippet.title;
      video.date = (data.items[0].snippet.publishedAt).substring(0,10);
      video.viewCount = data.items[0].statistics.viewCount;
    },

    // Initialize page when AJAX request completes
    complete: function(data) {
      if(key === videos.length - 1) {
          initialize();
      }
    }

  });
});

// Function to initialize the page
function initialize() {
  console.log(videos[1].title);
  // Default Selectors
  dateButton.classList.add('selected');
  ascendingButton.classList.add('selected');

  let sortedVideos = sortVideos(videos, criteria);
  displayVideos(sortedVideos);
}

// Initialize detault settings
let ascending = true;
let criteria = "date";

// Function to sort videos based on a set criteria
function sortVideos(videos, criteria) {
  let sortedVideos = [];

  // Sort by viewcount
  if (criteria === "viewCount") {
    sortedVideos = videos.sort((a, b) => b.viewCount - a.viewCount);
  }
  // Sort by date
  else if (criteria === "date") {
    sortedVideos = videos.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  // Sort by type
  else if (criteria === "type") {
    sortedVideos = videos.sort((a, b) => a.type.localeCompare(b.type));
  }

  // If sort order is descending, reverse the sorted array
  if (!ascending) {
    sortedVideos.reverse();
  }

  return sortedVideos;
}

// Function to display sorted videos
function displayVideos(videos) {

  // Get HTML container for videos
  const videoContainer = document.getElementById("video-container");

  // Debug
  console.log("Container Created");

  // Parse through sorted video array
  for (let i = 0; i < videos.length; i++) {

    // Current Video
    const video = videos[i];

    // Div element to hold all video elements
    const videoElement = document.createElement("div");
    videoElement.classList.add("video");

    // h3 element to hold video title
    const videoTitle = document.createElement("h3");
    videoTitle.innerText = video.title;

    // p element to hold video description
    const videoViewCount = document.createElement("p");
    videoViewCount.innerText = `View Count: ${video.viewCount}`;

    // p element to hold video date
    const videoDate = document.createElement("p");
    videoDate.innerText = `Date: ${video.date}`;

    // p element to hold video type
    const videoType = document.createElement("p");
    videoType.innerText = `Type: ${video.type}`;

    // Add youtube embed to video element
    videoElement.innerHTML = video.embedCode;

    // Add elements to main element
    videoElement.appendChild(videoTitle);
    videoElement.appendChild(videoDate);
    videoElement.appendChild(videoViewCount);
    videoElement.appendChild(videoType);

    // Update video container
    videoContainer.appendChild(videoElement);
  }
}

// Function to clear all videos
function clearVideos() {
  // Get HTML container for videos
  const videoContainer = document.getElementById("video-container");

  // Clear video container
  while (videoContainer.firstChild) {
    videoContainer.removeChild(videoContainer.firstChild);
  }
}

// Get sort buttons
const viewCountButton = document.getElementById("sort-viewcount");
const dateButton = document.getElementById("sort-date");
const typeButton = document.getElementById("sort-type");

// Add event listeners to sort buttons
viewCountButton.addEventListener("click", () => {
  clearVideos();
  // Sort videos by viewCount and display them
  criteria = "viewCount";
  sortedVideos = sortVideos(videos, criteria);
  displayVideos(sortedVideos);

  // Remove selected class from other buttons
  dateButton.classList.remove('selected');
  typeButton.classList.remove('selected');
  // Add selected class to this button
  viewCountButton.classList.add('selected');
});

dateButton.addEventListener("click", () => {
  clearVideos();
  // Sort videos by date and display them
  criteria = "date";
  sortedVideos = sortVideos(videos, criteria);
  displayVideos(sortedVideos);

  // Remove selected class from other buttons
  viewCountButton.classList.remove('selected');
  typeButton.classList.remove('selected');
  // Add selected class to this button
  dateButton.classList.add('selected');
});

typeButton.addEventListener("click", () => {
  clearVideos();
  // Sort videos by type and display them
  criteria = "type";
  sortedVideos = sortVideos(videos, criteria);
  displayVideos(sortedVideos);

  // Remove selected class from other buttons
  dateButton.classList.remove('selected');
  viewCountButton.classList.remove('selected');
  // Add selected class to this button
  typeButton.classList.add('selected');
});

// Get sort order buttons
const ascendingButton = document.getElementById("sort-ascending");
const descendingButton = document.getElementById("sort-descending");

// Add event listeners to sort order buttons
ascendingButton.addEventListener("click", () => {
  clearVideos();
  // Set sort order to ascending
  ascending = true;
  sortedVideos = sortVideos(videos, criteria);
  displayVideos(sortedVideos);

  // Remove selected class from other buttons
  descendingButton.classList.remove('selected');
  // Add selected class to this button
  ascendingButton.classList.add('selected');
});

descendingButton.addEventListener("click", () => {
  clearVideos();
  // Set sort order to descending
  ascending = false;
  sortedVideos = sortVideos(videos, criteria);
  displayVideos(sortedVideos);

  // Remove selected class from other buttons
  ascendingButton.classList.remove('selected');
  // Add selected class to this button
  descendingButton.classList.add('selected');
});



