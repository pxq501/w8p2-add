async function getADog() {
    const response = await fetch("https://random.dog/woof.json");
    const data = await response.json();
    console.log(data);
    document.getElementById("img1").src = data.url;
}

document.getElementById("text").addEventListener("keyup", wordcount)

function wordcount() {
    text = document.getElementById("text").value;
    const textArray = text.split(" ");
    if(textArray.length ) {
        getADog()
    }
}