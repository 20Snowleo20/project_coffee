document.addEventListener("DOMContentLoaded", function(){
    // Слушаем кастомное событие formValid, которое диспатчит validation.js
    document.addEventListener("formValid", function(event){

        // Получаем данные формы из события
        const formData = event.detail;

        // Очищаем консоль для наглядности (опционально)
        console.clear();

        
        // Построчный вывод данных
        console.log("ФИО:", formData.fullname);
        console.log("Телефон:", formData.number);
        console.log("Email:", formData.email);
        console.log("Тема:", formData.topic || "(не выбрано)");
        console.log("Сообщение:", formData.message || "(не заполнено)");
        console.log("Согласие на обработку:", formData.consent ? "Да" : "Нет");
        
        // Вывод временной метки
        const timestamp = new Date().toLocaleString();
        console.log("Время отправки:", timestamp);
    });
});