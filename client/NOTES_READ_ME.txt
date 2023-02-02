01-31-2023
##########
Update array-to-string method to be scalable V

Update recipe card to display a "diet" text. "diet" is being used
in the array-to-string method limiting it's use accross the app.

At some point you really need to read the fuck out of documentation
about ARGON2, JWT and EXPRESS methods.

Refactor index.js - this thing is ugly and overwhelming. Comments
would be helpful.

timestamptz in your schema.sql needs to be updated. Read documentation

The user can register. Overthinking this cost you many hours of coding.

Update CSS

02-01-2023
###########

create auth component

02-02-2023
###########

Alright, today we're going to create the component so a user
can register

Creating a form to do this should not be an issue

First thing you need to do is update the window hash with an anchor
tag for the drop-down modal (or nav bar for wider screens) to
#auth?sign-up


recipe card image is a background, use flex for like icon positioning
instead of position relative/absolute
