# herokuProject

Styling Textareas
Textareas are relatively difficult to style because, typically, they can be resized by the user which may mess with the styling of your page. One way to mitigate that is by using the resize property
resize: none makes it so that the user cannot resize the textarea at all
resize: vertical makes it so that the user can only resize it vertically
resize: horizontal makes it so that the user can only resize it horizontally
If you don't set any of these, textareas are defaulted to resize both vertically and horizontally
Alternatively, you can set a max-height or max-width so that the user cannot resize beyond a certain width
Note, you may have to set a default height and width to get it to the size you originally want the textarea to be at when they first load the page
Examples:
/* using resize none to make sure the textarea always stays a specific width/height */
textarea {
 width: 200px;
 height: 100px;
 resize: none;
}

/* using max-heights and max-widths to make it so that the user can only resize up to that point */
textarea {
 width: 200px;
 height: 100px;
 max-width: 400px;
 max-height: 150px;
}
sparkles Let's Style Our Textarea!
In our CSS: We want our textarea to look identical to our input elements from earlier, so let's just tack on textarea to those styles instead of repeating ourselves! Then, specific to just our textarea, we don't want it to resize and we want a specific height:

textarea {
 resize: none;
 height: 75px;
}
VALUE VS. PLACEHOLDER
value and placeholder are both attributes that you can add on to input and, to an extent, textarea elements. They're similar in that they place text into the forms, but different in how they do so. Let's see how:

value pre-fills out an input form with text that the user can actually manipulate or keep as is.
placeholder is grayed out on the input form with text that typically should guide the user as to what type of info they should put inside of the input form. The user cannot manipulate this text, in fact once they start typing into the input form, the placeholder should disappear completely.
Textarea "values"
<textarea> elements, unlike inputs, do not recognize the value attribute. If you want to pre-fill a textarea with text for the user to manipulate, you have to put the value between the <textarea></textarea> tags
EXAMPLE:
 /* input with pre-filled value */
 <input type="text" value="hello world!">

 /* textarea with pre-filled value */
 <textarea>hello world!</textarea>
sparkles Let's Add a Placeholder to our Textarea!
In our HTML: Update it so that it has a placeholder with a value of whatever you want it to say.