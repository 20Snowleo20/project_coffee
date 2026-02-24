document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("feedbackForm");
    if(!form) return;

    form.addEventListener("submit", function(event){
        event.preventDefault();

        // Сброс ошибок и скрытие ошибок именно для Tailwind
        document.querySelectorAll(".border-red-500").forEach(el => {
            el.classList.remove("border-red-500", "focus:ring-red-500");
        });
        document.querySelectorAll(".text-red-600:not(.hidden)").forEach(el => {
            el.classList.add("hidden");
            el.textContent = "";
        });

        let isValid = true;

        // Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById("fullname");
        const fullnameValue = fullname.value.trim();

        if(fullnameValue === ""){
            showError(fullname, "fullnameError", "Введите фамилию и имя");
            isValid = false;
        } else if(fullnameValue.split(" ").filter(word => word.length > 0).length < 2){
            showError(fullname, "fullnameError", "Введите фамилию и имя");
            isValid = false;
        }

        // Проверка правильности написания номера телефона
        const number = document.getElementById("number");
        const numberValue = number.value.trim();
        const numberDigits = numberValue.replace(/\D/g, "");

        if(numberValue === ""){
            showError(number, "numberError", "Введите номер телефона");
            isValid = false;
        } else if(numberDigits.length < 10){
            showError(number, "numberError", "Введите 10 цифр номера");
            isValid = false;
        }

        // Проверка правильности написания email 
        const email = document.getElementById("email");
        const emailValue = email.value.trim();

        if(emailValue === ""){
            showError(email, "emailError", "Введите email");
            isValid = false;
        } else if(!emailValue.includes("@") || !emailValue.includes(".")){
            showError(email, "emailError", "Введите корректный email");
            isValid = false;
        }

        //  Проверка правильности написания темы обращения
        const topic = document.getElementById("topic");
        const topicValue = topic.value.trim();

        if(topicValue === ""){
            showError(topic, "topicError", "Выберите тему обращения");
            isValid = false;
        }

        // Проверка обращения
        const message = document.getElementById("message");
        const messageValue = message.value.trim();

        // 6. Проверка согласия на обработку данных
        const consent = document.getElementById("consent");

        if(!consent.checked){
            showError(consent, "consentError", "Необходимо согласие");
            isValid = false;
        }

        if(isValid){
            const formData = {
                fullname: fullnameValue,
                number: numberValue,
                topic: topic.value.trim(),
                email: emailValue,
                message: messageValue,
                consent: consent.checked
            };

            const event = new CustomEvent("formValid", { detail: formData });
            document.dispatchEvent(event);

            alert("Форма отправлена! Данные в консоли.");
        }
    });

    // Функция показа ошибки
    function showError(input, errorId, message){
        input.classList.add("border-red-500", "focus:ring-red-500");
        const errorElement = document.getElementById(errorId);
        if(errorElement){
            errorElement.classList.remove("hidden");
            errorElement.textContent = message;
        }
    }

    // Сброс ошибки при вводе
    document.querySelectorAll("#fullname, #number, #email, #topic, #message").forEach(input => {
        input.addEventListener("input", function(){
            this.classList.remove("border-red-500", "focus:ring-red-500");
            const errorId = this.id + "Error";
            const errorElement = document.getElementById(errorId);
            if(errorElement){
                errorElement.classList.add("hidden");
                errorElement.textContent = "";
            }
        });
    });

    // Для чекбокса 
    const consent = document.getElementById("consent");
    if(consent){
        consent.addEventListener("change", function(){
            this.classList.remove("border-red-500");
            const errorElement = document.getElementById("consentError");
            if(errorElement){
                errorElement.classList.add("hidden");
                errorElement.textContent = "";
            }
        });
    }
});