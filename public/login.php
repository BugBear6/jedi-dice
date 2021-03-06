<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        crossorigin="anonymous">
    <link rel="stylesheet" href="https://getbootstrap.com/docs/4.1/examples/sign-in/signin.css"
        crossorigin="anonymous">

    <title>Jedi Dice - Login Page</title>
  </head>
  <body class="text-center">
    <form class="form-signin" action="login-action.php" method="post">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input type="text"
        name="username"
        id="inputUsername"
        class="form-control"
        placeholder="Username" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password"
        id="inputPassword"
        name="password"
        class="form-control"
        placeholder="Password"
        required>
      <button class="btn btn-lg btn-primary btn-block"
        type="submit">Sign in</button>
    </form>
  </body>
</html>
