// global vars
var _model, _root;

function onSwellRTReady() {

  console.log("SwellRT is ready to use");
  // sesion
  SwellRT.startSession("http://demo.swellrt.org/", SwellRT.user.ANONYMOUS, "" ,
    function ( sessionInfo ) {
      console.log("Session started");

    if ( !localStorage.modelId ) {
      var question = ""
      do {
        question = prompt("Please enter your question")
      } while (!question);

      localStorage.modelId = SwellRT.createModel(
       function(model) {

         // keep the reference in a global var
         _model = model;
         // Get the root map of the collaborative model
         _root = model.root

         console.log('Making Wave public and creating initial lists');
          // Add a participant to participate in the data model
          model.addParticipant("@local.net");

          // Add question
          _root.put("question",question);

          // Add Responses List
          list1 = model.createList();
          _root.put("responses",list1);
          // Add points List
          list2 = model.createList();
          _root.put("points",list2);
          console.log("New model: " + localStorage.modelId);

          startApp( model );
        });
    } else {
    var modelId = localStorage.modelId;
    SwellRT.openModel( modelId, function(model) {
      startApp(model)
    });
    }
  },
  function(error) {
    alert("Error trying to start a session with the server: " + error)
  });
}

function startApp ( model ) {
  // keep the reference in a global var
  _model = model;
  // Get the root map of the collaborative model
  _root = model.root

  registerEventHandlers();

  var questionTitle = _root.get("question").getValue()
  $('#question').html(questionTitle);

  console.log("Getting content...");

  diplayPosts(_root);

  console.log('Ready to rock!')
}

function registerEventHandlers() {
  console.log("Registering event handlers...");

  // new post (text)
  _root.get("responses").registerEventHandler(SwellRT.events.ITEM_ADDED,
    function( changes ) {
      console.log("new Post!");
      $('#responses').append( renderPost(changes[1].getValue(),changes[0],"0") );
    }
  );

  // new post (points)
  var pointsList = _root.get("points")
  pointsList.registerEventHandler(SwellRT.events.ITEM_ADDED,
    function( changes ) {
      changes[1].registerEventHandler(SwellRT.events.ITEM_CHANGED,
        function ( newStr, oldStr ){
          var id = changes[0]
          var answer = _root.get("responses").get(id).getValue()
          var response = renderPost(answer,id,newStr)
          $('#'+id).replaceWith( response )
          console.log("+10 points to "+id);
          // check if the post upgrades
          var post = $('#'+id);
          var prevPost = post.prev();

          var points = +newStr;
          if ( prevPost.length > 0 && points > prevPost.data("points") ) {
            while ( prevPost.prev().length > 0 && points > prevPost.prev().data("points") )
                prevPost = prevPost.prev();
            prevPost.before(post)
          }
          console.log("new Post points!");
        }
      );
    }
  );

  // new up post (points)
  for (var i = 0; i<pointsList.size(); ++i) {
    var response = pointsList.get(i);
    (function (id) {
      response.registerEventHandler(SwellRT.events.ITEM_CHANGED,
        function ( newStr, oldStr ){
          var answer = _root.get("responses").get(id).getValue()
          var response = renderPost(answer,id,newStr)
          $('#'+id).replaceWith( response )
          console.log("+10 points to "+id);

          // check if the post upgrades
          var post = $('#'+id);
          var prevPost = post.prev();

          var points = +newStr;
          if ( prevPost.length > 0 && points > prevPost.data("points") ) {
            while ( prevPost.prev().length > 0 && points > prevPost.prev().data("points") )
                prevPost = prevPost.prev();
            prevPost.before(post)
          }
        }
      );
    })(i);
  }
}

function renderPost( answer, num, points ) {
  var rendered = Mustache.render('<div id={{num}} data-points={{points}} class="box"><div class="level">' +
  '<div class="level-left"><div class="level-item"><p>{{answer}}</p></div></div>' +
  '<div class="level-right">'+
  '<div class="level-item"><p>Points: {{points}}</p></div>' +
  '<div class="level-item"><button class="button is-primary" onclick=up({{num}})>Up</button></div></div>' +
  '</div></div>',
  {answer: answer, num: num, points:points})
  return rendered;
}

function up( id ){
  var answer = _root.get("responses").get(id).getValue()
  var points = _root.get("points").get(id)
  var pointsStr = String( +points.getValue() + 10);
  points.setValue(pointsStr)
}

function post() {
  var pointsList = _root.get("points")
  var responsesList = _root.get("responses")
  var points = _model.createString("0");
  var str = _model.createString($('#text').val())
  responsesList = responsesList.add(str)
  pointsList = pointsList.add(points)
  $('#text').val("")
}

function diplayPosts( _root ) {
  var responsesList = _root.get("responses")
  var pointsList = _root.get("points")
  // extract from model and convert to a js list of objects
  posts = []
  for (var i = 0; i<responsesList.size(); i++) {
    var answer = responsesList.get(i).getValue();
    var points = pointsList.get(i).getValue();
    posts.push({index: i, answer : answer, points : +points})
  }
  //order js list by points from greater to lower (descending order)
  posts.sort(function(a,b){return (b.points - a.points)})
  var html = ""
  posts.forEach(function (post, orderIndex) {
    html += renderPost(post.answer,post.index,post.points);
  });
  $('#responses').html( html );
}

function newQuestion() {
  SwellRT.closeModel(localStorage.modelId)
  localStorage.modelId = "";
  location.reload()
}
