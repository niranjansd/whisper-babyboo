const recordButton = document.getElementById('recordButton');
const loader = document.getElementById('loader');
let recorder = null;

// For todays date;
Date.prototype.today = function () { 
  return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
   return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

function myFunction() {
  // your code to run after the timeout
}

function checkExistsWithTimeout(path, timeout) {
  return new Promise((resolve, reject) => {
    const timeoutTimerId = setTimeout(handleTimeout, timeout)
    const interval = timeout / 6
    let intervalTimerId

    function handleTimeout() {
      clearTimeout(timerId)

      const error = new Error('path check timed out')
      error.name = 'PATH_CHECK_TIMED_OUT'
      reject(error)
    }

    function handleInterval() {
      fs.access(path, (err) => {
        if(err) {
          intervalTimerId = setTimeout(handleInterval, interval)
        } else {
          clearTimeout(timeoutTimerId)
          resolve(path)
        }
      })
    }

    intervalTimerId = setTimeout(handleInterval, interval)
  })
}

recordButton.addEventListener('click', () => {
  if (recorder === null) {
    console.log('recording started');
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        recorder = new MediaRecorder(stream);
        recorder.start();
        recordButton.textContent = 'Stop Recording';
      });
  } else {
    recorder.stop();
    var datetime = new Date().today() + "_" + new Date().timeNow();
    var datetime = datetime.replace(/:/g, "-").replace("/", "-").replace("/", "-");
    var filename = 'recording_'+datetime+'.m4a'
    recorder.addEventListener('dataavailable', (event) => {
        const audioFile = new Blob([event.data], { type: 'audio/mp4' });
        const url = URL.createObjectURL(audioFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        console.log('recording saved');
        loader.style.display = 'block';
        send_prompt("C:\\Users\\niran\\Downloads\\"+filename);
        loader.style.display = 'none';
      });
    recordButton.textContent = 'Record';
  }
});


function send_prompt(filename) {

    if (filename == "") {
        console.log("No file detected.");
        return;
    };
    console.log("Sending file: " + filename);
    req = $.ajax({
        cache: true,
        type: "POST",
        url: "message.php",
        data: JSON.stringify({
            file: filename,
            model: "whisper-1",
            response_format: "text",
        }),
        dataType: "json",
        success: function (results) {
            console.log(results);
            // Add results to the page in the transcript div.
            $("#transcript").html(results.text);
        }
    });

}
