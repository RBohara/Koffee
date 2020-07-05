const TypeWriter = function(textElement, word, wait=3000) {
    this.textElement = textElement;
    this.word = word;
    this.text = '';
    this.type();
    this.wait = parseInt(wait, 10)
    this.isDeleting = false;
}

// Type method
TypeWriter.prototype.type = function() {
    // Get full text 
    const fullText = this.word;

    // Check if deleting
    if(this.isDeleting) {
        // Remove char
        this.text = fullText.substring(0, this.text.length - 1)
    } else {
        // Add char
        this.text = fullText.substring(0, this.text.length + 1);
    }

    // Insert text into element
    this.textElement.innerHTML = `<span class="text">${this.text}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.text === fullText) {
        // Make a pause at end
        typeSpeed = this.wait;
        // set deleting to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
        this.isDeleting = false;
        // Pause before  typing
        typeSpeed = 500;
    }


    setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM method
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const textElement = document.querySelector('.text-type');
    const word = textElement.getAttribute('data-word');
    const wait = textElement.getAttribute('data-wait');

    // Init TypeWriter
    new TypeWriter(textElement, word, wait)
}