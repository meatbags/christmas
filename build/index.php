<?php
$ref = $_GET['ref'] ?? null;
if (!in_array($ref, array('Isaac', 'Lily', 'Lauren', 'Virginia', 'Jim', 'Helen'))) {
  $ref = null;
}
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Christmas Card &mdash; <?php echo $ref; ?></title>
    <link rel='stylesheet' href='style.min.css'>
    <script type='text/javascript' src='app.min.js'></script>
    <link rel='icon' href='favicon.png'>
  </head>
  <body>
    <div class='wrapper'>
      <div class='wrapper__inner'>
        <div id='renderer-target'></div>
      </div>
    </div>
  </body>
</html>
