export async function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = "";
  
    function type() {
      if (i < text.length) {
        element.innerHTML +=  text.charAt(i);
        i++;
         setTimeout(type, speed);
      }
    }
    
     type();
  }
  