const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check previous theme status from local storage
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
}

// Toggle theme and save to local storage
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
    }
});

// document.getElementById("toggleMenu").addEventListener("click", function() {
//     const menu = document.querySelector(".help-menu");
//     menu.style.display = menu.style.display === "flex" ? "none" : "flex";
// });

document.addEventListener("DOMContentLoaded", function () {
    const floatingBtn = document.getElementById("toggleMenu");
    const menu = document.querySelector(".help-menu");

    let offsetX, offsetY, isDragging = false, wasDragging = false;

    // شروع درگ
    floatingBtn.addEventListener("mousedown", function (e) {
        isDragging = true;
        wasDragging = false;
        offsetX = e.clientX - floatingBtn.getBoundingClientRect().left;
        offsetY = e.clientY - floatingBtn.getBoundingClientRect().top;
        floatingBtn.style.cursor = "grabbing";
    });

    // حرکت موس
    document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;
        wasDragging = true;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        let maxX = window.innerWidth - floatingBtn.offsetWidth;
        let maxY = window.innerHeight - floatingBtn.offsetHeight;

        newX = Math.max(0, Math.min(maxX, newX));
        newY = Math.max(0, Math.min(maxY, newY));

        floatingBtn.style.left = newX + "px";
        floatingBtn.style.top = newY + "px";
        floatingBtn.style.position = "fixed";

        // همزمان جابه‌جا کردن منو
        menu.style.left = (newX - menu.offsetWidth - 10) + "px"; // نمایش در چپ دکمه
        menu.style.top = (newY + floatingBtn.offsetHeight + 10) + "px"; // پایین دکمه
    });

    // پایان درگ
    document.addEventListener("mouseup", function () {
        isDragging = false;
        floatingBtn.style.cursor = "grab";
    });

    // کلیک روی دکمه برای نمایش/مخفی کردن منو
    floatingBtn.addEventListener("click", function (e) {
        if (!wasDragging) {
            let isMenuVisible = menu.style.display === "flex";
            menu.style.display = isMenuVisible ? "none" : "flex";

            if (!isMenuVisible) {
                let btnRect = floatingBtn.getBoundingClientRect();
                let menuHeight = menu.offsetHeight;
                let menuWidth = menu.offsetWidth;
                let windowHeight = window.innerHeight;
                let windowWidth = window.innerWidth;

                let newLeft = btnRect.left - menuWidth - 10; // نمایش در چپ دکمه
                let newTop = btnRect.top + floatingBtn.offsetHeight + 10; // نمایش در پایین دکمه

                // اگر منو از پایین صفحه بیرون زد، بالای دکمه نمایش داده شود
                if (newTop + menuHeight > windowHeight) {
                    newTop = btnRect.top - menuHeight - 10;
                }

                // اگر منو از چپ صفحه بیرون زد، در راست دکمه نمایش داده شود
                if (newLeft < 0) {
                    newLeft = btnRect.right + 10;
                }

                menu.style.left = newLeft + "px";
                menu.style.top = newTop + "px";
            }
            e.stopPropagation();
        }
    });

    // بستن منو با کلیک روی صفحه
    document.addEventListener("click", function (e) {
        if (!floatingBtn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = "none";
        }
    });
});



