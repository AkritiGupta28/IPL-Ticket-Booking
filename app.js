
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const url = new URL(link.href, window.location.href);

        if (url.pathname === window.location.pathname && url.hash) {
            const target = document.getElementById(
                decodeURIComponent(url.hash.substring(1))
            );

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

window.addEventListener("load", function () {
    if (window.location.hash === "#booking") {
        const bookingSection = document.getElementById("booking");

        if (bookingSection) {
            bookingSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            showToast("Welcome! You can book your IPL tickets now.");
        }
    }
});

const bookingForm = document.querySelector("#booking form");

if (bookingForm) {
    let currentTooltip = null;

    function removeValidationTooltip() {
        if (currentTooltip) {
            currentTooltip.remove();
            currentTooltip = null;
        }
    }

    function showValidationTooltip(field) {
        removeValidationTooltip();

        const tooltip = document.createElement("span");
        tooltip.className = "validation-tooltip";
        tooltip.setAttribute("role", "alert");
        tooltip.textContent = field.validationMessage;

        let wrapper = field.closest(".validation-wrapper");

        if (!wrapper) {
            wrapper = document.createElement("span");
            wrapper.className = "validation-wrapper";

            field.parentNode.insertBefore(wrapper, field);
            wrapper.appendChild(field);
        }

        wrapper.appendChild(tooltip);
        currentTooltip = tooltip;

        field.focus();
    }

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        removeValidationTooltip();

        if (!bookingForm.checkValidity()) {
            const invalidField = bookingForm.querySelector(":invalid");

            if (invalidField) {
                showValidationTooltip(invalidField);
            }

            return;
        }

        showToast(
            "Order accepted! Your IPL ticket booking has been submitted successfully."
        );

        bookingForm.reset();
    });

    bookingForm.addEventListener("input", function () {
        removeValidationTooltip();
    });

    bookingForm.addEventListener("change", function () {
        removeValidationTooltip();
    });

    bookingForm.addEventListener("reset", function () {
        removeValidationTooltip();
    });
}
