<!DOCTYPE html>
<html lang="ru-ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="./static/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="./static/style.css">
    <title>Cтатистика COVID19</title>
</head>
<body>

    <div class="container header">
        <h1>Covid19</h1>
         <h4>статистика по регионам</h4>
    </div>


    <div class="container">
        <div class="row">
            <div id="render" class="col">
                <h3>Выберите регион</h3>
            </div>

            <div class="col">
                <h3>За последние 4 недели</h3>
                <p id="canvas"></p>
            </div>
        </div>
    </div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js" integrity="sha512-QSkVNOCYLtj73J4hbmVoOV6KVZuMluZlioC+trLpewV8qMjsWqlIQvkn1KGX2StWvPMdWGBqim1xlC8krl1EKQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="module" src="./static/script.js"></script>
</body>
</html>