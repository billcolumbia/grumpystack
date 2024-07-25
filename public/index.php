<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GET OFF MY LAWN, WORLD!</title>

  <link rel="stylesheet" href="/assets/css/app.css">
</head>
<body>
  <h1>GET OFF MY LAWN!</h1>

  <button x-data="{ msg: 'Click me!' }" x-text="msg" @click="msg = 'DONT CLICK ME GET OFF MY LAWN'"></button>
  <div hx-get="/hx/rand.php" hx-trigger="load">
    Loading...
  </div>

  <script src="/assets/js/app.js"></script>
  <script src="/assets/js/alpine.js" type="module"></script>
  <script src="/assets/js/htmx.js" type="module"></script>
  <script src="http://localhost:3000/live-reload.js"></script>
</body>
</html>
