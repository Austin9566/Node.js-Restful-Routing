# Node.js Restful Routing

### 開發簡介

這是透過 Node.js 的框架 Express 開發的 Restful Routing 功能，能夠透過網頁簡單的做學生資料的查詢、新增、修改、刪除。

---

### 以下介紹如何使用 Node.js Restful Routing

#### 1. 透過 Docker-compose 啟動 Node.js 開發環境

```shell
docker-compose up -d
```
#### 2. 測試 Node.js Restful Routing 功能
因為是透過 Docker 建立的 Node.js 開發環境，可以查看 Docker 是在哪個環境下安裝的，查看該主機的 IP 地址，接著使用 Postman 測試以下的 API URL。
記得下方的 localhost 要改成正確的主機IP哦。
* **Get**
  * 查詢所有學生資料：http://localhost:3000/students
  * 查詢特定學生資料：http://localhost:3000/students/_id
    * _id：這是學生的 _id，可以先查詢所有學生資料的 _id，接著在 _id 那邊修改一下就可以看到特定學生資料。