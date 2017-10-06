<?php
if(isset($_POST['submit'])) {

  $email_to = "contact@androsaxon.co.uk";
  $email_subject = "Androsaxon website contact";
  $js = isset($_POST['js']) && $_POST['js'] == 'true';

  function died($error) {
    if($GLOBALS['js'] == 'true') {
      header('HTTP/1.1 400 '.$error);
    } else {
      header('Location: /error?error='.$error);
    }
    die();
  }

  // validation expected data exists
  if(!isset($_POST['name']) ||
    !isset($_POST['email']) ||
    !isset($_POST['message'])) {
    died('We are sorry, but there appears to be a problem with the form you submitted.');
  }

  $name = $_POST['name']; // required
  $email_from = $_POST['email']; // required
  $message = $_POST['message']; // required

  $error_message = "";
  $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }

  $string_exp = "/^[A-Za-z .'-]+$/";

  if(!preg_match($string_exp,$name)) {
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
  }

  if(strlen($message) < 2) {
    $error_message .= 'The message you entered does not appear to be valid.<br />';
  }

  if(strlen($error_message) > 0) {
    died($error_message);
  }

  $email_message = "Form details below.\n\n";


  function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
  }

  $email_message .= "Name: ".clean_string($name)."\n";
  $email_message .= "Email: ".clean_string($email_from)."\n";
  $email_message .= "Message: ".clean_string($message)."\n";

  // create email headers
  $headers = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  $headers .= 'From:  ' . $name . ' <webmaster@androsaxon.co.uk>' . " \r\n" .
    'Reply-To: '.  $email_from . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
  @mail($email_to, $email_subject, $email_message, $headers);

  if($js == 'true') {
    header('HTTP/1.1 200');
  } else {
    header('Location: /success ');
  }
}
?>

