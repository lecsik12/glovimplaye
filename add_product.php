<?php
// Подключение к базе данных
$host = "localhost"; // Или IP-адрес сервера
$user = "root"; // Имя пользователя MySQL
$password = ""; // Пароль (по умолчанию пустой)
$dbname = "glovimplaye"; // Имя базы данных

$conn = new mysqli($host, $user, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получаем данные из формы
$category = $_POST['category'];
$subcategory = $_POST['subcategory'];
$name = $_POST['name'];
$description = $_POST['description'];
$seller = $_POST['seller'];
$price = $_POST['price'];
$stock = $_POST['stock'];

// Подготавливаем SQL-запрос
$sql = "INSERT INTO products (category, subcategory, name, description, seller, price, stock) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssid", $category, $subcategory, $name, $description, $seller, $price, $stock);

// Выполняем запрос
if ($stmt->execute()) {
    echo "Товар успешно добавлен!";
} else {
    echo "Ошибка: " . $stmt->error;
}

// Закрываем соединение
$stmt->close();
$conn->close();
?>
