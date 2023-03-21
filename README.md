# Uniswap V2의 Swap UI 및 기능 개발

https://app.uniswap.org/#/swap?chain=mainnet


## 첫 화면

<img width="399" alt="image" src="https://user-images.githubusercontent.com/14309582/219430754-fc5ee6c9-291f-4eda-8f4e-29c72723ba4c.png">

input이 비워져있다면 '금액을 입력하세요'가 뜹니다.

<img width="401" alt="image" src="https://user-images.githubusercontent.com/14309582/219431086-e977e4e1-49f0-45cf-89a4-ae6da2375417.png">

input 수량 입력시 화면입니다.

input 창의 토큰 라벨을 클릭하면 토큰 선택 모달이 뜹니다. 

## 토큰 선택 모달

<img width="399" alt="image" src="https://user-images.githubusercontent.com/14309582/219433761-d81503bd-74eb-4090-878f-e8efd525ba7f.png">

검색창, 최근 누른 토큰들(최대 7개), 전체 토큰 목록, 토큰 목록 관리 버튼(작동X)이 있습니다. 


<img width="397" alt="image" src="https://user-images.githubusercontent.com/14309582/219433836-c5a3248b-3aa4-4e89-8bc8-dc444131a936.png">

검색창에 토큰의 이름을 입력하여 검색할 수 있습니다. 


<img width="402" alt="image" src="https://user-images.githubusercontent.com/14309582/219433418-e2f1752f-b4ac-43a1-a20a-09dee73dbf70.png">

검색창 밑엔 최근에 누른 토큰들이 뜹니다. (세션 스토리지 저장)


<img width="399" alt="image" src="https://user-images.githubusercontent.com/14309582/219434010-7a2f5f4e-0d0b-40eb-9a94-8044ed119abb.png">

토큰 목록에서 토큰을 선택할 수 있습니다. 

토큰을 선택하면 모달이 닫힙니다. 

## 기능 소개

<img width="396" alt="image" src="https://user-images.githubusercontent.com/14309582/219434562-f1df36a2-7535-493f-b20d-aa7f73c92960.png">

토큰의 갯수를 입력하면 원하는 토큰과의 환율을 알 수 있습니다.

![Feb-17-2023 01-58-42](https://user-images.githubusercontent.com/14309582/219435302-7c631775-f7ee-41b8-ab0a-5d2ae4bf9225.gif)

좌측의 0은 소수가 아니면 제거됩니다. 

<img width="394" alt="image" src="https://user-images.githubusercontent.com/14309582/219436003-8a8fd1e0-4267-4830-82ed-85bf901cee5c.png">

소수점 10자리까지만 보여줍니다. 


## 미구현
아래 input에 입력시에 그것에 맞춰 변경되도록 하는 걸 구현하지 못 했습니다. 
=> 구현했습니다. 
