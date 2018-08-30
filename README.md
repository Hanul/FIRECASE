***Firebase가 상당히 발전하여, Firebase를 그대로 쓰는 편이 간단하다고 판단되므로 이 프로젝트는 중단합니다.***

# FIRECASE
Firebase에서 작동하는 UPPERCASE 포팅

초기에 비용이 들지 않고, 서버사이드 코딩을 하지 않아도 된다는 점에서 매력적이라 할 수 있습니다.

## 할 수 있는 것
- 웹 사이트: 데이터베이스를 JavaScript로 가져와 동적으로 뷰를 생성하기 때문에, 검색엔진에서 색인이 잘 되지 않을 수 있습니다.
- 웹 애플리케이션 - 채팅, SNS 등
- 모바일 애플리케이션
- 랭킹 시스템
- SNG

## 할 수 없는 것
- MMORPG: 대규모 실시간 통신을 할 수 없으므로 불가능합니다.

## UPPERCASE에 비해 지원하지 않는 부분
- History 지원 하지 않음

## FIRECASE 사용하기
```html
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
		<link rel="stylesheet" href="FIRECASE/UPPERCASE-BOOT/R/BASE_STYLE.MIN.css">
	</head>
	<body>
		<!-- Firebase 콘솔에서 <웹 앱에 Firebase 추가> 버튼을 누르면 나오는 내용을 복사합니다. -->
		<script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
		<script>
		  // Initialize Firebase
		  var config = {
		    apiKey: "...",
		    authDomain: "...",
		    databaseURL: "...",
		    projectId: "...",
		    storageBucket: "...",
		    messagingSenderId: "..."
		  };
		  firebase.initializeApp(config);
		</script>
		<script src="FIRECASE/UPPERCASE-CORE/BROWSER.MIN.js"></script>
		<!-- TestBox를 프로젝트의 BOX 이름으로 변경합니다. -->
		<script>
		'use strict';
		RUN(() => {
			
			CONFIG.isDevMode = true;
			
			// 사용하는 BOX들을 정의합니다.
			BOX('TestBox');
			
			CONFIG.defaultBoxName = 'TestBox';
		});
		</script>
		<script src="FIRECASE/MODEL.js"></script>
		<!-- 필요한 파일들을 로드합니다. -->
		<script src="TestBox/MAIN.js"></script>
		<script src="TestBox/....js"></script>
		<script>
		'use strict';
		RUN(() => {
			INIT_OBJECTS();
			
			TestBox.MAIN();
		});
		</script>
	</body>
</html>
```

## UPPERCASE BOX 이용하기
box.uppercase.io에 저장되어 있는 BOX들 중 웹 브라우저 환경 전용 BOX들은 FIRECASE에서도 사용할 수 있습니다. [ubm](https://github.com/Hanul/ubm)을 이용하여 필요한 BOX를 설치하시기 바랍니다.

## `JOIN`
비밀번호는 최소 6자 이상이어야 합니다.

TODO: 이메일 인증 메일 보내기
TODO: 비밀번호 재설정하기
