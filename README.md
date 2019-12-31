# tich_hop_he_thong_nhom_10

### Cài đặt Database Mysql
Trước đó máy bạn phải có mysql [Download](https://dev.mysql.com/downloads/)

chạy query
> CREATE TABLE `talend`.`slack_google_drive` (
>  `id` INT(11) NOT NULL AUTO_INCREMENT,
>  `drive_client_id` VARCHAR(255) NULL,
>  `drive_client_secret` VARCHAR(255) NULL,
>  `drive_refresh_token` VARCHAR(255) NULL,
>  `slack_token` VARCHAR(255) NULL,
>  `slack_user_token` VARCHAR(255) NULL,
>  `drive_webhook_id` VARCHAR(255) NULL,
>  `drive_callbackUrl` VARCHAR(255) NULL,
>  `drive_webhook_token` VARCHAR(255) NULL,
>  `drive_page_token` VARCHAR(255) NULL,
>  `drive_time_out_token` VARCHAR(255) NULL,
>  `new_tablecol` VARCHAR(255) NULL,
>  PRIMARY KEY (`id`));

>CREATE TABLE `talend`.`slack_trello` (
>  `id` INT(11) NOT NULL AUTO_INCREMENT,
>  `slack_token` VARCHAR(255) NULL,
>  `slack_user_token` VARCHAR(255) NULL,
>  `trello_token` VARCHAR(255) NULL,
>  `trello_api_key` VARCHAR(255) NULL,
>  `trello_id_model` VARCHAR(255) NULL,
>  `trello_url_listener` VARCHAR(255) NULL,
>  `trello_webhook_id` VARCHAR(255) NULL,
>  `trello_board_id` VARCHAR(255) NULL
>  PRIMARY KEY (`id`));

### Chạy server temp

Bạn phải cài nodejs trước đó tại [Ndejs](https://nodejs.org)

> cd server_temp

> npm install

> npm start

### Download talend ESB

Talend ESB download at [Talend_ESB](https://www.talend.com/products/application-integration/esb-open-studio)

### Chạy bằng Talend open studio
-> Mở và giải nén thư mục vừa download và mở ra. vào Studio. Copy Folder DEMO vào Folder workspace

-> Mở talend application (TOS_ESB-win-x86_64) lên và mở job DEMO vừa copy vào workspace

-> Mở lần lượt các job drive_slack và trello_slack lên, chọn tất cả các thẻ tFileInputJSON lên chọn lại path file json tương ứng tại địa chỉ: DEMO/metadata/json/

-> Click chuột trái vào các job và bấm run. Các 2 job đang để chung port 8080 nên chỉ nên chạy lần lượt từng job

### khởi tạo Slack và lấy dữ liệu cho database
Tại [Slack_api](https://api.slack.com/) tạo app của mình

Vào App vừa tạo và vào mục Incoming Webhooks và click button Add New Webhook to Workspace, chọn channel slack bạn muốn tạo và ấn allow. Sau đó copy mã token
ở cuối path vừa tạo và copy vào cột slack_token trong database vào 2 bảng vừa tạo

Vào OAuth & Permissions tạo token và copy token vừa tạo ở OAuth Access Token vào slack_user_token trong database vào 2 bảng vừa tạo

vào Interactive Component, Trong mục Interactivity thêm url {your_url}/api/interactivity_component, trong select Menu thêm url {your_url}/api/select_menu, click save changes

Vào slack commands click Create New Command tạo 2 command
{ Command: /trello, RequestURL: {your_url}/slack_command_trello }
{ Command: /google_drive,  RequestURL: {your_url}/slack_comment_drive }

click Save