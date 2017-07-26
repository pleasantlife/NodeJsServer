# node.js와 mysql로 웹서버 만들기

## 목표
 - node.js와 mysql을 연동하여 데이터 CRUD(Create, Read, Update, Delete)가 가능한 웹서버 제작

## 로직
 1. server.js
  - node.js의 http 모듈을 가져와서 서버를 생성함.
 2. module/router.js
  - 전달받은 http 헤더 유형에 따라 코드 분기. CRUD가 이뤄지도록 분기함.
    ("GET", "PUT", "UPDATE", "DELETE")
 3. bbs.js / user.js
  - router.js의 구분에 따라 분기된 코드를 수행.
 4. bbsDao.js
  - bbs.js를 통해 받은 데이터를 쿼리형태로 가공함.
 5. database/index.js
  - bbsDao.js를 통해 넘겨진 쿼리를 mysql에 전달하고, 쿼리 실행결과를 받음.

## mysql 쿼리 명령어

  1. Create
  2. 
