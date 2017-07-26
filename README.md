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

## Amazon Web Service에서 웹서버 구축하기

### 장점
  1. 신규가입자에 한해 1년동안 무료로 특정 서비스를 제한적으로 이용할 수 있는 프리티어 제공.(연습용으로는 전혀 부족함이 없음.)


  2. 우분투, 윈도우 등 다양한 서버를 손쉽게 구축할 수 있음.

### AWS 세팅방법(우분투 리눅스 기준)

  1. Launch Instance에서 Ubuntu Server 최신 버전 선택

  2. type에 Free tier eligible이라고 되어 있는 유형 선택 후 하단에 Configure Instance Details 버튼을 3번 클릭하여 Configure Security Group으로 이동

  3. 웹브라우저나 PostMan등에서 접속할 수 있도록 하기 위해 All Traffic 개방(연습용일 때만!)

  4. Launch Instance를 누르면 key를 다운로드 할 것인지 물어봄.

  5. pem 파일을 다운로드 하여 원하는 폴더에 보관

  6. puttyGen을 통해 다운로드 받은 pem 파일을 ppk 파일로 변환
  (Load an existing private key file->로딩완료->Save private key)

  7.putty 실행 후 좌측 카테고리에서 SSH>Auth를 누르면 뜨는 화면에서 Private key file for authentication에 ppk 파일 입력

  8. 좌측 카테고리에서 Session 클릭 후 화면이 뜨는데, 해당 화면에서 Host Name에 AWS EC2 Public DNS 주소 입력
   - AWS EC2 Dashboard에서 해당 인스턴스를 클릭하면 하단의 Description을 눌러 확인

  9. Port는 22로 두고 Connection type을 SSH로 설정

  10. 프로그램 하단 Open을 눌러 서버 접속 후 login as에 ubuntu 입력하면 접속 완료

### 우분투 EC2에서 mysql 설치 및 workbench 연동

  1. mysql 설치를 원하는 폴더로 이동 (물론 전역설치도 가능)

  2. npm init 명령어 입력

  3. npm install mysql 명령어 입력

  4. 이름/패스워드 설정
      (웬만하면 이름은 root, 패스워드는 mysql로 만들어서 연습하자)

  5. apt-get update 명령어 입력

  6. mysql 서버 주소는 127.0.0.1

  7. mysql 접속 시 mysql -u root -p 명령어 입력

   - root는 mysql 설치시 설정한 username.
   - 명령어 입력 후 패스워드를 물을 때에도 mysql 설치시 설정한 password 입력.


### 리눅스 및 vi 에디터 기본 명령어

  1. 리눅스 간단 명령어

    - cd : Change Directory 명령어. 뒤에 ../를 입력하면 상위 디렉토리로 이동.

    - cp : 복사 명령어.

    - mv : 잘라내기 명령어.

  2. vi 에디터 명령어

    - insert키 : 입력상태를 변경.(보기>수정>보기>수정)

    - esc키 : 보기 상태로 빠져나감.

    - esc + :wq : 저장하고 나감.

    - esc + :w : 저장안하고 나감.

    - shift + insert : 클립보드 데이터 붙여넣기.
