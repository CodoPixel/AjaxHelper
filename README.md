# AjaxHelper

A small TypeScript & JavaScript class that helps you write simple HTTP requests.

## Get started

You just need to import the source code (`.ts` and `.js`) which you can find in the `src` folder of the project:

```html
<script src="src/AjaxHelper.js"></script>
```

Now initialize an instance of `AjaxHelper`:

```javascript
var ajax = new AjaxHelper();
```

## Documentation

When you create an instance of `AjaxHelper`, you also create an instance of `XMLHttpRequest`.

```javascript
var ajax = new AjaxHelper();
var xhr = ajax.xhr; // You shouldn't have to do this, but it can be useful to know.
```

The `mimeType` of this request is set to `application/json` by default. This means that the return value of your PHP file should be a JSON string (via the method: `json_encode`). You can change this behavior:

```javascript
ajax.overrideMimeType("text/plain");
```

Besides, a default header is sent: `X-Requested-With: xmlhttprequest`. Add headers with:

```javascript
ajax.addRequestHeader("Content-type", "application/x-www-form-urlencoded");
```

Now, use Ajax:

```javascript
var ajax = new AjaxHelper();
ajax.onSuccess = (response) => {
	var data = JSON.parse(response);
	console.log(data);
};

ajax.onError = (status) => {
	if (status === 404) {
		console.error("Page not found");
	} else {
		console.error("Error");
	}
};

// "GET" or "POST"
// if the method is not "GET" or "POST", the value will be set to "GET"
ajax.open("GET", "users.php?q=something", true);
ajax.send();
```

If you use `POST`, here is an example of use:

```javascript
var form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
	e.preventDefault(); // avoids reloading the page when you submit the form

	var ajax = new AjaxHelper();
	ajax.onSuccess = (response) => console.log(JSON.parse(response));
	ajax.onError = (status) => console.error("Error " + status);

	var data = new FormData(form); // creates the $_POST php variable
	ajax.open("POST", "login.php", true); // async set to true by default
	ajax.send(data);
});
```

## License

MIT License
