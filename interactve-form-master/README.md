# interactve-form
In this project I used my skills in order to update and engance a form so that it is engaging, interactive and easy to use. 

Exceeds Expectations: 

The user is not able to select activities that occur at the same time. 

Real-time error message: (line 162)
This is applied to the "Card Number:" field under payment info. It checks the user's input in real time and compares it to the regex validation that was created for the cc number. Once the cc num reaches 13 digits the error message dissapears, once it surpasses 16 digits the error message reappears.

Conditional Error Message: 
This is applied to the "Email Address:" field. First, a function was to validate the email address and display the appropriate message. (line 176) The function takes 2 parameters, a field and the pattern, checks the length, tests it with the regex validation for email and checks if the email is valid. It then displays the appropriate messages. 

If the email field is blank the message "This email field cannot be blank" is displayed. 

If the email field is formatted incorrectly the message " Email address must be formatted correctly (example@example.com)" is displayed.

The function was then used in order to compare it to the user input. (Line 204)
