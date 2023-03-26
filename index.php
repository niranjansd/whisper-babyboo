<?php
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Audio Recorder</title>
	<link rel="stylesheet" href="css/style.css?v1.1">
  </head>
  <body>
    <button id="recordButton">Record</button>
    <div id="loader">
      <div class="spinner"></div>
    </div>    
    <!-- Make a box to show transcript -->
    <div id="transcript" contenteditable="true" data-placeholder="What you said"></div>
    <!-- <script src="js/layer.min.js" type="application/javascript"></script> -->
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.cookie.min.js"></script>
    <script src="js/layer.min.js" type="application/javascript"></script>
    <script src="js/app.js"></script>
  </body>
</html>
