const lyricData = [
    { text: "", time: 0.2 },
    { text: "My", time: 0.55 },
    { text: "baby", time: 1.36 },
    { text: "", time: 2.60 },
    { text: "I love", time: 3 },
    { text: "you", time: 3.17 },
    { text: "so", time: 3.81 },
    { text: "much", time: 4.0 },
    { text: "forever", time: 4.48 },
    { text: "you", time: 5 },
    { text: "and", time: 5.41 },
    { text: "I", time: 5.81 },  
    { text: "I love", time: 6.51 },
    { text: "you", time: 7.0 },
    { text: "ohhh", time: 7.92 },
    { text: "I love <3", time: 8.55 },
    { text: "you", time: 8.60 },
    { text: "so", time: 9 },
    { text: "much", time: 9.75 },
    { text: "forever", time: 10},
    { text: "you", time: 10.55 },
    { text: "and", time: 11 },
    { text: "I...", time: 11.5 },
    { text: " ", time: 12.3 },
    // ver 2
    { text: "", time: 0.2 },
    { text: "My", time: 0.55 },
    { text: "baby~", time: 1.16 },
    { text: "", time: 2.60 },
    { text: "I love", time: 2.8 },
    { text: "you", time: 3.17 },
    { text: "so", time: 3.81 },
    { text: "much", time: 4.0 },
    { text: "forever", time: 4.48 },
    { text: "you", time: 5 },
    { text: "and", time: 5.51 },
    { text: "I", time: 5.81 },  
    { text: "I love", time: 6.51 },
    { text: "you", time: 7.0 },
    { text: "ohhh", time: 7.92 },
    { text: "I love <3", time: 8.55 },
    { text: "you", time: 8.60 },
    { text: "so", time: 9 },
    { text: "much", time: 9.75 },
    { text: "forever", time: 10},
    { text: "you", time: 10.55 },
    { text: "and", time: 11 },
    { text: "I...", time: 11.5 },
    { text: " ", time: 12.3 },
];

// Kiểm tra xem có dữ liệu về số lượng người xem trong localStorage không
let views = localStorage.getItem('views');

if (!views) {
    // Nếu không có dữ liệu, khởi tạo số lượng người xem là 1
    views = 1;
} else {
    // Nếu có dữ liệu, tăng số lượng người xem lên 1
    views = parseInt(views) + 1;
}

// Lưu số lượng người xem vào localStorage
localStorage.setItem('views', views);

// Hiển thị số lượng người xem lên trang web
document.getElementById('view-count').textContent = views;


const lyricElement = document.getElementById('lyrics');
const audio = document.getElementById('audio');
let currentIndex = 0;
let loopCount = 0; // Biến để theo dõi số lần đã lặp

function showLyrics() {
    const currentLyric = lyricData[currentIndex];
    const wordSpan = document.createElement('span');
    wordSpan.textContent = currentLyric.text + ' ';
    lyricElement.appendChild(wordSpan);
    currentIndex++;

    if (currentIndex < lyricData.length) {
        const nextLyricTime = lyricData[currentIndex].time;
        const currentAudioTime = audio.currentTime;
        const delay = (nextLyricTime - currentLyric.time) * 1000;
        setTimeout(showLyrics, delay);
    } else {
        currentIndex = 0; // Reset lại từ đầu sau khi hiển thị hết lời bài hát
    }

    // Đẩy lên sau khi hiển thị một câu
    if (currentIndex > 0 && currentIndex < lyricData.length) {
        const previousLyricTime = lyricData[currentIndex - 1].time;
        const currentAudioTime = audio.currentTime;
        const pushDelay = (currentLyric.time - previousLyricTime) * 1000;
        setTimeout(pushLyricsUp, pushDelay);
    }
}

function pushLyricsUp() {
    lyricElement.classList.add('fade-out'); // Add the fade-out class
    setTimeout(() => {
        // lyricElement.textContent = ''; // Remove this line to keep the lyrics visible
        lyricElement.classList.remove('fade-out'); // Remove the fade-out class
        lyricElement.style.transform = "none"; // Reset the transform
    }, 1300); // Waiting time, similar to the transition time
}



audio.addEventListener('play', function() {
    currentIndex = 0;
    lyricElement.textContent = '';
    loopCount = 0; // Reset lại số lần lặp khi bắt đầu phát audio
    showLyrics();
});

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('audio');
    setTimeout(function() {
        audio.play();
    }, 500); // 500 milliseconds = 0.5 seconds
});
audio.addEventListener('ended', function() {
    // Clear all displayed lyrics
    lyricElement.textContent = '';

    // Display "I love you" with heart effect
    const loveYouText = document.createElement('span');
    loveYouText.textContent = "I love you ";
    loveYouText.classList.add('love-you-text', 'glowing-text'); // Add both classes for styling and glow effect
    const heartIcon = document.createElement('span');
    heartIcon.innerHTML = "&hearts;";
    heartIcon.style.color = "#FF007F"; // Set màu hồng của nhóm Blackpink cho hình trái tim
    // Customize the heart color if needed
    loveYouText.appendChild(heartIcon);
    lyricElement.appendChild(loveYouText);
});




/*document.addEventListener("DOMContentLoaded", function() {
    // Lấy đối tượng âm thanh
    const audio = document.getElementById('audio');
    
    // Trì hoãn việc bật âm thanh sau 0.5 giây
    setTimeout(function() {
        audio.play();
    }, ); // 500 milliseconds = 0.5 giây
});
*/

