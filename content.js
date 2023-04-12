function solve() {
    console.log("here")
    // Retrieve the div element by its ID
    const div = document.getElementById('target');

    // Retrieve the number from the div element
    const number = parseInt(div.innerText);

    // Calculate the square of the number
    const square = number * number;

    // Get div element to display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `The square of ${number} is ${square}.`;
    alert('yo');
}