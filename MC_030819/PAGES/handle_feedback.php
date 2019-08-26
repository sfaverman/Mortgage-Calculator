<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- need meta viewport for RWD -->
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title> My Simple Mortgage Calculator - Contact Us</title>
        <!--[if lt IE9]>
            <script src="scripts/html5shiv.min.js" type="text/javascript"></script>
        <![endif]-->
    <!-- CSS -->
    <!-- Normalize.css makes browsers render all elements more consistently -->
    <link rel="stylesheet" href="../CSS/normalize.css">
    <link rel="stylesheet" href="../CSS/main.css" type="text/css">

    <!-- JS -->

</head>
  <body>
  <div class="container">

  	<header>
        <figure>
              <img src="../IMAGES/image_hand.jpg" alt="mortgage calculator">
         </figure>

     <!-- Navigation - HAMBURGER MENU -->
     <div id="navigation">
         <input type="checkbox" id="toggle">
         <label for="toggle">Menu</label>
                <!--nav.mainNav>ul>li*6>a[#]-->
         <nav class="mainNav">
            <ul>
                <li><a href="../index.html">Calculator</a></li>
                <li><a href="amortizationTable.html">Schedule
                </a></li>
                <li><a href="terms.html">Terms</a></li>
                <li class="active"><a href="contact.html">Contact</a></li>

            </ul>
         </nav>
     </div>
     <!-- end of NAVIGATION -->
     </header>

     <main>
         <h1>Mortgage Loan Calculator</h1>

<?php
//  script: handle_feedback.php
//	This page receives the data from contact.html.php
//  It will receive: name, phone, email and comments and submit in $_POST


/* $_POST is case sensitive
 * Must match the name attribute values from the form
*/

if(isset($_POST['email'])) {

    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "sofiasd@yahoo.com";
    $email_subject = "Email from Mortgage Calculator website";

    function died($error) {
        // your error code can go here
        echo "<h3>We are very sorry, but there were error(s) found with the form you submitted.</h3>";
        echo "<h3>These errors appear below.</h3>";
        echo "<h3>".$error."</h3>";
        echo "<h3>Please go back and fix these errors.</h3>";
        die();
    }


    // validation expected data exists
    if(!isset($_POST['name']) ||
        !isset($_POST['subject']) ||
        !isset($_POST['email']) ||
        /*!isset($_POST['phone']) ||*/
        !isset($_POST['msg'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $name = $_POST['name']; //required
	$email = $_POST['email'];     //required
	$subject = $_POST['subject'];  //required
	$comments = $_POST['msg']; //required


    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }

    $name_exp = "/^[A-Za-z .'-]+$/";
	/* $string_exp ="+[a-z]{2,3} +[a-z]*|[\w'-]*"; */

  if(!preg_match($name_exp,$name)) {
    $error_message .= 'The Name you entered does not appear to be valid.<br />';
  }

  if(strlen($subject) < 5) {
    $error_message .= 'The Subject you entered do not appear to be valid.<br />';
  }


  if(strlen($comments) < 2) {
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
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
    $email_message .= "Email: ".clean_string($email)."\n";
	$email_message .= "Subject: ".clean_string($subject)."\n";
    $email_message .= "Comments: ".clean_string($comments)."\n";

// create email headers
$headers = 'From: '.$email."\r\n".
'Reply-To: '.$email."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);


//Print the received data:
print '<h3> Thank you, '.$name.', for your comments. </h3>
<h3>We appreciate your feedback:<snap class="feedback">'.$comments.'</snap></h3>
<h3>Your feedback is very important for us.</h3>
<h3>Please allow us 24-48 hours to respond.</h3>';


/* This displays the content of the $_POST superglobal array
	if any post data has been sent.
	$_POST is a superglobal, which is an associative array
	The print_r() function allows you to inspect the contents
	of arrays and is used for debugging purposes.
	The <pre> tags simply makes the output easier to read

<pre>
	<?php print_r($_POST); ?>
</pre>

*/

}

?>
   </main>
     <footer>
     	<!--<p>Questions? <a href="mailto:sofiasd@yahoo.com">Email us</a> for help.</p>-->
     	<p>Copyright &copy;2019 My Simple Mortgage Calculator.</p>
     </footer>
  </div>

  </body>

</html>
