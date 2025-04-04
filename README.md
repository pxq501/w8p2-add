# Week 8 Practical 2: Web APIs

This practical is about using asynchronous JavaScript to fetch data from web APIs. It is split into two stages. The first stage uses the async / await approach to call an API and the second uses a promise chain.

## Stage 1: Written Kitten, but with dogs

[Written Kitten](https://writtenkitten.co/) is a website that motivates you to write by showing a random cat picture for every 100 words that you write. Try it out… You may want to use some Lorem Ipsum text to save time. Notice that it uses local storage to save your text as you write.

Your task is to implement the dog version of Written Kitten, which has the same exact functionality but shows random pictures of dogs instead of cats. 

The dog images will come from a free API: [https://random.dog/woof.json](https://random.dog/woof.json). The API returns a JSON object with a “url” property, which provides the URL of a random dog image.

1. Create an HTML file, a CSS file, and a JS file, and connect the CSS and JS files to the HTML as usual.
2. Add a `textarea` and a `div` to your HTML and give both elements ids.
3. In your JS file, define an **async** function that will be used to make an API call to get a new random dog.
4. Inside your function, use `fetch()` to call the API endpoint (the URL above) and save its response to a variable or constant called `response`. `fetch()` is asynchronous and you are calling it from an `async` function, so you should precede it with the `await` keyword. Print the API `fetch()` response to the console.

Your function should look something like this:

```
async function getADog() {
    const response = await fetch("https://random.dog/woof.json");
    console.log(response);
}
```
5. Using Live Preview to view your website, open the console and call the function. It will print a `Response` object. When a `fetch()` call completes successfully, it returns a `Response` that contains information about the API call.
6. You will need to do one more thing to get to the data from the API but first, open the `Response` in the console and view its properties. Notice the `status` property, which should have the value `200`. This number can be useful for debugging `fetch()` problems. 200 means the request was successful. Other numbers (like 404 or 503) means something has gone wrong. If you see a number other than 200, you can search the internet to find out what went wrong and how to fix it.
7. The last property in the `Response` should be a nested object called `[[Prototype]] Response`—open it. This nested object contains the actual data from the API. Notice two properties, `text` and `json`—these are the data fields. You will need to call another asynchronous operation to extract the contents of one of the properties (`json`). Add the following lines to your function (you can remove the existing `console.log()`):

```
const data = await response.json();
console.log(data);
```
8. The first of the lines you have just added uses an asynchronous method to extract the JSON data from the API response. Once again, call the function from the browser console. This time, you will see a JSON object with two properties: `fileSizeBytes` and `url`. The structure of JSON objects returned by an API is determined by the API creator. In this case, `url` provides the URL of a dog image or video so this is the property you will need to work with.

The asynchronous component of this exercise is complete. Use your existing knowledge of JavaScript to complete the remaining steps:
- Inside the function, replace the contents of the `div` you created earlier with an `image` element that displays the dog image provided by the API. A complete URL can be used in the `src` attribute of an image.
- Sometimes the API returns a URL with a file extension that the image element can't display (e.g. mp4 or .webm). If this happens, you will see a broken image icon. You can choose how to handle this.
- Finally, add an event listener to the `textarea` that will trigger every time the user types something. For other input elements, you could listen for a "change" event. However, `textareas` only receive change events when they receive or lose focus. Instead, listen for a "keyup" event, which will trigger when a user releases a key while the `textarea` is focused. Inside the event handler function, add some code that will count how many words the user has typed, and call the function you wrote earlier every 100 words. You will find the string [`split()`](https://www.w3schools.com/jsref/jsref_split.asp) method helpful. You may want to reduce the words per dog to a smaller number while testing.

Optional extra: use `localStorage` to save the user's work, just like the Written Kitten website.

## Stage 2: Days until the next Bank Holiday
The UK government maintains [an API service](https://www.api.gov.uk/index/#index) that provides data on all sorts of things from addresses to water quality. Some of the APIs are restricted but many are open access. 

For this exercise, you will work with the [Bank Holidays API](https://www.api.gov.uk/gds/bank-holidays/#bank-holidays) to create a website that will display the number of days until the next Bank Holiday as well as the name and date of the holiday. Open the [Bank Holidays API](https://www.api.gov.uk/gds/bank-holidays/#bank-holidays) information page.

In the last exercise, you used the async / await approach to asynchronous JavaScript. This time you will use promise chaining. 

1. Create HTML, CSS, and JS files for this exercise and connect them all together.
2. In your JS file, write a function then uses `fetch()` with promise chaining to call the API endpoint (shown on the information page) and print the returned data. Putting `fetch()` inside another function isn’t strictly necessary but it prevents the API being called repeatedly by Live Preview during development. Excessive API calls can get your IP address blocked or run up a huge bill in the case of paid APIs.
3. From stage 1, you should know that fetching data from an API requires *two* asynchronous operations: `fetch()` to get the API response and `.json()` to extract the data from the response. This means you will need two `.then()` calls chained to the `fetch()` call. Each `.then()` expects you to pass an anonymous function with one parameter. The parameters correspond to the variables / constants you used to store the result of an operation preceded by the `await` keyword in the previous exercise. Your API call should look something like this:

```
fetch("https://www.gov.uk/bank-holidays.json")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
    });
```

4. Run your code and look at the data printed to the console. You will see it is a lot more complex than the data from the previous exercise, and most of it isn’t relevant.
5. Inspect the data in the console and work out how to get just the *future* events for England and Wales from the returned data. You will need to select two keys from the object.
6. Save this filtered data to a variable called `holidays`. The filtered data should be an array of 60-80 objects, each representing a different Bank Holiday. A tip for selecting just the relevant data: dot notation won’t work in this case as one of the keys uses an invalid character for a JS property name. You will need to use square brackets instead e.g. `data["property-name"]` rather than `data.property-name`.
7. Working in the anonymous function passed to the second call to `then()`, write some code to find the next Bank Holiday in the `holidays` array. Apply your programming knowledge to work out the logic. Here are some tips:

    - You can get the current date and time by creating a new Date object with no arguments e.g. `const today = new Date();`
    - JavaScript allows you to compare Dates using <, <=, >, and >=. Currently, the dates in the event objects in the `holidays` array are strings, so you will need to convert each date to a Date objected in order to compare it to `today`. You can do this by passing the string to a new Date object e.g. `const eventDate = new Date(dateString)` where `dateString` is the string you want to convert.
    - The events returned by the API are sorted in date order.
8. Once you have code to get the next Bank Holiday, check that it identifies the same holiday shown by the government page: [https://www.gov.uk/bank-holidays](https://www.gov.uk/bank-holidays).
9. The next step is to calculate how many days there are until the next Bank Holiday. Working with dates is a common task in web development but also tricky due to the many ways to format a date, time zones, varying days in a month, and leap years.

The approach for calculating days between two dates, `firstDate` and `laterDate`, is as follows:

    1. Get the milliseconds between two dates using the `Date.getTime()` method: 
    
```const msBetween = laterDate.getTime() – firstDate.getTime();```

    2. Divide `msBetween` by the number of milliseconds in a day—you can work out the number of milliseconds yourself!
    3. In this exercise, the result of the previous step is likely a float because the event date will not have a time of day associated with it (it will default to midnight), whereas the current date likely does. Round up the result of step 2 using `Math.ceil(amtToRound);`

Apply the steps above to find the days between the Bank Holiday and the current date. Use a calendar to check that the number of days is correct.

10. Finally, display the number of days to the next Bank Holiday and the name and date of the Bank Holiday in the HTML. The [Date documentation](https://www.w3schools.com/jsref/jsref_obj_date.asp) describes methods that will help you format the date in a user-friendly way.
