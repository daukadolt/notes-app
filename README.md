Notes App
---
Тестовое задание для Wazzup.
    
##### Структура проекта:

    .
    ├── .idea                   # Конфиги для WebStorm. Если открыть проект в нём, есть уже готовые скрипты для запуска проекта
    ├── src                     # Сервер и тесты
    ├── .babelrc                # Конфиги для Babel
    ├── .eslintrc.js            # Конфиги для eslint. Сейчас это Airbnb style + свои кастомные правила
    ├── .gitignore              # gitignore для Node.js и JetBrains 
    ├── .travis.yml             # Конфиг для Travis CI 
    ├── docker-compose.yml      # Конфиг для docker-compose 
    ├── jest.config.js          # Конфиг для Jest, фреймворка для тестов 
    ├── package.json 
    └── package-lock.json 

Доступные endpoints
---
1. 

Как начать?
---
1. Отправьте POST запрос на `/api/auth/signup` с данными для регистрации.
    Пример: 
    ```
    {
        "text": "newuser",
        "password": "somepassword"
    }
    ```
2. После успешной регистрации используйте те же данные для POST `/api/auth/login`.
    В ответ вы получите JWT token.
3. Полученный JWT token необходимо использовать в качестве Bearer header.
4. Используя токен, можно создать записку сделав POST запрос на `/api/notes`
    Payload должен иметь поле "text" с соответствующим значением. Пример:
    ```
    {
        "text": "lorem ipsum dolorem ..."
    }
    ```
   
   В ответ вы получите объект с новой заметкой:
   ```
   {
       "id": "85f74a51-dfb8-4218-9554-d04e4767e22f",
       "text": "what's up, world?",
       "createdAt": "2020-08-24T12:52:29.364Z",
       "updatedAt": "2020-08-24T12:52:59.694Z",
       "UserId": "6d89145b-ec0f-46a3-9944-4f478a79120e"
   }
   ```
5. Используя токен, можно увидеть список id своих заметок на  GET `/api/notes`:
    ```
    [
        "85f74a51-dfb8-4218-9554-d04e4767e22f"
    ]
    ```
6. Используя токен и id заметки, можно получить детали заметки из базы на GET `/api/notes/:id`
    К примеру, используя id из шага 5 выше необходимо сделать GET `/api/notes/85f74a51-dfb8-4218-9554-d04e4767e22f`.
    Ответ из сервера:
    ```
   
    ```
7. Для изменения заметки, необходимо отправить PUT `/api/notes/:id` с payload как внизу:
   ```
        {
        "text": "what's up, world?"
        }
    ```
8. Для того чтобы предоставить доступ к неавторизованному пользователю, нужно отправить POST `/api/events/:id/share`
   В ответ вы получите id, который в проекте называется SharedID.
   Пример такого id:
   ```
    ceb106e7-ea8b-472f-b526-17e18c109da1
    ```
9. Вышеуказанный SharedID можно теперь использовать, переходя по GET `/api/notes/shared/:id`.
    В случае с SharedID на шаге 8, это будет `/api/notes/shared/ceb106e7-ea8b-472f-b526-17e18c109da1`
    Получаем просто текст: `what's up, world?`
10. Если перейти на GET `/api/notes/85f74a51-dfb8-4218-9554-d04e4767e22f` можно увидеть поле `SharedIDs: [...]` с такими ID
11. Также есть DELETE `/api/notes/:id`
12. Есть также POST `/api/auth/logout`, который инвалидирует нынешний JWT
13. Есть POST `/api/auth/logout-all`, который инвалидирует все JWT до нынешнего момента
