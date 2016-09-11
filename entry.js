function createNewModel() {
  console.log("Not model found, creating a new model...");

     var objId = SwellRT.createModel(
       function(model) {
       // handy declarations for the easy management
       var obj = model;
       var root = obj.root
       // Create a new painting:
       painting = obj.createList()
       painting = root.put("painting", painting);
       // store model id in local storage to retrive the data in future sessions
       localStorage.modelId = objId;
       console.log("New model created with id '" + localStorage.modelId + "' stored in local storage.")
     })
     // Make wave public for the local.net domain
     obj.addParticipant("@local.net");

     return objId;
   }

function onSwellRTReady() {

  SwellRT.on(SwellRT.events.NETWORK_CONNECTED, function() {
      console.log("Network connected");
  });
  SwellRT.on(SwellRT.events.NETWORK_DISCONNECTED, function( data )   {
      alert("Network disconnected. Reconnecting, please wait... ");
  });

  SwellRT.on(SwellRT.events.FATAL_EXCEPTION, function(data) {
      alert("Fatal exception!! "+ data.cause);
      SwellRT.stopSession();
  });

  console.log("SwellRT is ready to use!");

  SwellRT.startSession("http://localhost:9898/", SwellRT.user.ANONYMOUS, "" ,
  function ( sessionInfo ) {
    if ( !localStorage.modelId )
      createNewModel();

    console.log("Session started");

    SwellRT.openModel( "local.net/s+r9BwQ0f-QwA",
     function( model ) {
       // keep the reference in a global var
       _model = model;
       // Get the root map of the collaborative model
       var _root = _model.root
       painting = _root.get("painting")
       circle = paintCircle(painting,50,50,40,'green',4,"yellow")
       renderSVG(circle)
      });
  },
    function(error) {
      alert("Error trying to start a session with the server: " + error)
    }
  );
}
