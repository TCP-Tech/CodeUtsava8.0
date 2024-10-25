document.addEventListener("contentsLoaded", async () => {
    const messageElement = document.getElementById('countDown-message');
    const startButton = document.getElementById('start-button');
    let clock;  
    let countdownInterval;
    const baseUrl = "https://codeutsava.nitrr.ac.in/server/";
    const countdownDuration = 28 * 60 * 60 * 1000; 
    // const countdownDuration =  10 * 1000; 
    function initializeFlipClock(remainingTime) {
        const countdownSeconds = Math.floor(remainingTime / 1000);  
        clock = $('#flipclock').FlipClock(countdownSeconds, {
            clockFace: 'HourlyCounter',
            countdown: true,  
            autoStart: true
        });
    }
    async function fetchCounterData() {
        try {
            const response = await fetch(`${baseUrl}getcounter/`);
            const data = await response.json();
            return data?.data[0] || data.data; 
        } catch (error) {
            console.error("Error fetching countdown data:", error);
            return null; 
        }
    }
    async function setCounterData(flag, startTime, endTime) {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        try {
            const response = await fetch(`${baseUrl}setcounter/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken  
                },
                body: JSON.stringify({ flag, startTime, endTime }),
            });
            return await response.json(); 
        } catch (error) {
            console.error("Error setting countdown data:", error);
            return null;
        }
    }
    
    startButton.addEventListener('click', async () => {
        const counterData = await fetchCounterData();
        if (counterData && !counterData.flag) { 
            const currentTime = Date.now(); 
            const endTime = currentTime + countdownDuration;
            await setCounterData(true, currentTime, endTime); 
            initializeFlipClock(countdownDuration); 
            // startCountdown(countdownDuration); 
            startButton.style.display = "none"; 
        } else {
            messageElement.textContent = "Countdown has already started!"; 
        }
    });

    (async () => {
        const counterData = await fetchCounterData();
        if (counterData && counterData.flag) {
            const currentTime = Date.now();
            const remainingTime = counterData.endTime - currentTime;

            if (remainingTime > 0) {
                startButton.style.display = "none"
                initializeFlipClock(remainingTime); 
                // startCountdown(remainingTime);  
            } else {
                messageElement.textContent = "GAME OVER: Hackathon Complete! You’ve Leveled Up!";
                messageElement.style.fontSize = "1.5rem";
                startButton.style.display = 'none'; 
            }
        }
        else{
                initializeFlipClock(0);
        }
    })();
});
