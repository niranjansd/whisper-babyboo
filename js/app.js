const recordButton = document.getElementById('recordButton');
let recorder = null;

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
    recorder.addEventListener('dataavailable', (event) => {
        const audioFile = new Blob([event.data], { type: 'audio/wav' });
        const url = URL.createObjectURL(audioFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recording.wav';
        a.click();
        console.log('recording saved');
      });
    recordButton.textContent = 'Record';
    // Show loading animation untile next command is executed.
    var loading = layer.load(1, {
      shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    send_prompt("C:\\Users\\niran\\Downloads\\KajuAudio\\Papi - Wednesday at 5-30 PM\\Papi - Wednesday at 5-30 PM.m4a");

  }
});


function send_prompt(filename) {

    if (filename == "") {
        console.log("Please ask your question.");
        return;
    };
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
