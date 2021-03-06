# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`. 

### [перейти](https://mesto-reinat.nomoredomains.club)

## Frontend  

### Описание
Сайт представляет собой фотогалерею, наподобие сервиса Instagramm. На данный момент функционал включает в себя возможность изменения имени и информации о пользователе, проставление и снятие лайков для соответствующих фотографий, удаление и добавление фото по ссылке, а так же возможность полноэкранного просмотра. В формы ввода добавлены механизмы валидации. В данный момент фото может добавлять любой пользователь, все фотографии сохраняются на сервере. Удалять добавленные фотографии может только тот человек, который их загрузил. Добавлена возможность менять аватар. Добавлена регистрация и авторизация пользователей.

### Используемые технологии и методологии
В данной работе демонстрируются навыки владения такими технологиями верстки как flexbox, gridbox. Сайт полностью адаптивен и корректно работает при разрешении области просмотра от 320px до 4К и выше, подстраивая контент для наиболее выгодного отображения. Функционал сайта реализован с помощью JS и библиотеки React. В работе используется функциональный декларативный подход. Используются хуки useState, useRef, useContext, useEffect. Константы вынесены в отдельный файл. Используется библиотека react-router-dom, компонент с карточками защищен через ProtecteRoute. Настроена работа с локальным хранилищем. Проект собран с помощью WebPack'а, при сборке используется минификация и транспиляция JS бабелем.


## Backend

#### Домен Api: https://api.mesto-reinat.nomoredomains.monster
#### IP Адрес Сервера: 84.201.134.234

### Описание
Бэкенд представляет собой сервер, написанный на Node JS. Сервер включает в себя работу с БД Mongo, валидирует входящие данные на всех этапах обработки, имеет механизмы регистрации и авторизации пользователей, выдачу токенов, вывод обработанных ошибок.

### Используемые технологии и методологии
В данной работе демонстрируются навыки бладением библиотеками Node JS, celebrate, mongoose, express-winston, bcrypt и другими. Используется модульный подход написания кода. Поступающие запросы обрабатываются посредством методов CORS. Корректность переданных ссылок проверяется с помощью регулярных выражений 