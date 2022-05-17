<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codeigniter-React Frontend</title>
</head>
<body>
    <div id="app" data-auth="<?= $auth?>" data-userid="<?= $user_id?>" data-selected="<?= $selected_note?>"></div>
    <script src="<?php echo base_url(); ?>public/js/main.js"></script>
</body>
</html>