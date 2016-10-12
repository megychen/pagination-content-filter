var studentList = $(".student-list");
var studentItem = $(".student-item");
var onePageItem = 10;
var lastValue = ""; // Store the value from input side
var message = $("<li class='message'>Sorry, no results matched</li>");// If no results matched, get the hint message
studentList.append(message); // Hide the message at start
message.hide();

// Initialization when page loded

function initilization(totalItem) {
  console.log("initialize...")
  // Calculate the number page and pagination button
  var pageNumber = Math.ceil(totalItem / onePageItem);
  
  // Add pagination button according to page number
  var $pagination = $("<div Class='pagination'></div>");
  for( var i = 1; i < pageNumber + 1; i++) {
      $pagination.append("<li><a>" + i + "</a></li>");
  }
  studentList.append($pagination);
  
  $(".pagination li:first a").addClass("active"); // Set li first item anchor with class active
  $(".pagination a").on("click", anchorEventHandler); // Bind click event with anchor
}

// Display ten item one page

function tenPerPage(item) {
  // Construct page for search item
  if(studentItem.hasClass("block")) {
    for( var i = 10; i < item; i++) {
  		$(".block").eq(i).hide();
  	}
  } else { //construct initial page
  	for(var i =10; i < item; i++) {
  	    $(".student-item").eq(i).hide();
    }
   }
}

// Construct anchor event handler

function anchorEventHandler() {
	console.log("page event handler");
	$(this).addClass("active"); // Add class "active" when click the anchor 
	$(this).parent().siblings().children().removeClass("active"); // Remove siblings class when click the anchor
	var $currentPage = $(this).text(); // Get current page number
	getCorrectPage($currentPage);
}

// Get corrent page when click pagination button

function getCorrectPage(currentPage) {
    console.log("get correct page...");
    var start = (currentPage - 1) * onePageItem;
    var end = start + onePageItem;

    if(studentItem.hasClass("block")) {
    	$(".block").hide().slice(start, end).show(800, "linear");// Get correct page for filter item list

        
    } else {
    	studentItem.hide().slice(start, end).show(800, "linear"); // Get correct page for initial item list
    }
}

// Add search input and button
function addSearchButton() {
    console.log("Creat search input and button...");
    var pageHeader = $(".page-header");
    var $studentSearch = $("<div class='student-search'><input placeholder='Search for students...'> <button>Search</button></div>");
    pageHeader.append($studentSearch);

    $(".student-search button").click(searchFilter);
    $(".student-search input").keyup(searchFilter);
  
}

// When click search button, filter the results

function searchFilter(){
    console.log("Search function worked...");
    
    var matchItem = 0; // Calculate the matched item number
    var noMatchItem = 0; //Calculate the unmatched item number
    var names = $('.student-list li h3');
    var emails = $('.student-list li .email');
    inputValue = $(".student-search input").val().toLowerCase(); // Get the value of input
    clearFunction(); // If last input value doesn't equal to current input value, clear class 'block'

    for(var i = 0; i < studentItem.length; i++){
        var position = $('.student-list li .email').eq(i).text().indexOf('@');
        var email = $('.student-list li .email').eq(i).text().substring(0, position);

        if(names.eq(i).text().indexOf(inputValue) !== -1 || email.indexOf(inputValue) !== -1){

            studentItem.eq(i).addClass("block"); //Display item if matched input value
            studentItem.eq(i).show();
            matchItem++;
            console.log(matchItem);
        }else{
            noMatchItem++;
            studentItem.eq(i).css("display", 'none'); //Don't display if doesn't mached input valued
        }
    }

    //If no matched item, display the hint message, otherwise hide the message
    if(noMatchItem === studentItem.length){
        message.show();
        studentItem.eq(i).removeClass("block");
    } else {
        message.hide();
    }

    // If matched item is higher 10, remove original consctruct new pagination, else hide the pagination
    if(matchItem > 10){
        $('.pagination').detach(); // remove the original pages.
        initilization(matchItem);
        tenPerPage(matchItem);
        message.hide();
    }else{
        $('.pagination').hide();

    }
    // If user input is empty, display original page and remove class 'block'
    if(inputValue.length === 0){
        $(".student-item:nth-of-type(n+11)").hide(); 
        studentItem.removeClass("block");
    }
    

}

// Construct clear function
function clearFunction() {
	
	if(lastValue !== inputValue) {
		studentItem.removeClass("block");
		lastValue = inputValue;
	}
}



//Initialization when page loaded
initilization(studentItem.length);
tenPerPage(studentItem.length);
addSearchButton();