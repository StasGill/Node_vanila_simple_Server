const text = require("./data"); // Пример импорта из файла data.js
const http = require("http"); //Подключения библиотеки для создания сервера
const fs = require("fs"); //Подключение библиотеки для работы с файловой системой
const path = require("path"); //Подключение библиотеки для работы с путями

//Создание сервера

const server = http.createServer((req, res) => {
  //Первый способ обработки через ветвление

  //   if (req.url === "/") {
  //     fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {  //Считываем файл index.html
  //       if (err) {
  //         throw err;
  //       }

  //       res.writeHead(200, { "Content-type": "text/html" });    //Добавляем хедер к ответу

  //       res.end(data);                                          //В ответе оправляем data
  //     });
  //   } else if (req.url === "/contact") {
  //     fs.readFile(path.join(__dirname, "public", "contact.html"), (err, data) => {
  //       if (err) {
  //         throw err;
  //       }

  //       res.writeHead(200, { "Content-type": "text/html" });

  //       res.end(data);
  //     });
  //     }

  //Второй способ

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url //Создаем ссылку на путь к файлу в зависимости от url
  );

  const ext = path.extname(filePath); //Проверяем есть расширение у нашего пути
  let contentType = "text/html"; //Переменная с заглушкой о типе файла

  switch (ext) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/js";
      break;
    case ".html":
      contentType = "text/html";
      break;
  }

  if (!ext) {
    filePath += ".html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, "public", "error.html"), (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error");
        } else {
          res.writeHead(200, {
            "Content-type": contentType,
          });
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, {
        "Content-type": contentType,
      });
      res.end(content); //Завершает ответ с сервера и передает контент
    }
  });
  console.log(filePath);
});

const PORT = process.env.PORT || 3000;

//Запуск сервера
server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}...`);
});
