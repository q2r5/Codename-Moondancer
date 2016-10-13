var p;
var loadComplete = true;

window.onpopstate = function(event) {
  if (event.state.page != undefined) {
    location.reload();
  }
}

function loadPage() {
  if (p == undefined && location.pathname.startsWith("/page/")) {
    p = Number(location.pathname.slice(6)) + 1;
  } else if (p == undefined) {
    p = 2;
  }
  console.log('Loading page ' + p + '.');
  loadComplete = false;

  $("#posts").append('<span id="spinner"><i class="fa fa-3x fa-spinner fa-pulse"></i></span>');

  $.get('/page/' + p + '/', "", function(data){
    $("#spinner").remove();
    $(data).find(".post").appendTo("#posts");
    Tumblr.LikeButton.get_status_by_page(p);
    loadComplete = true;
    history.pushState({page: p},"","/page/" + p);
    p++;
  });
}