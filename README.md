# hide-api-key-with-serverless-functions

### 이 레포지토리는 Client-Side 에서 API Key를 노출하지 않고 Third Party API와 통신하기 위한 redirect server 입니다.

serveless functions 중 Netlify Functions를 활용하였습니다. 따라서 netlify 계정이 반드시 필요합니다. (netlify sign up은 무료입니다)

### 설정방법

1. netlify 에 github repository를 등록한다.

2. netlify 에 환경변수를 설정한다.
   
※ 환경변수를 설정한 후에는 반드시 deploy를 하여야 합니다. 새로이 deploy한 후에 변경된 환경변수가 적용됩니다.
   
   ```
   // 예시
   API_KEY = Yousdfjidsof-asfdliaj
   HOST = https://bigsaigon333.github.io // *, http://localhost:5500, http://127.0.0.1:5500 등도 가능
```
   
※ HOST는 하나만 설정할 수 있습니다. 따라서, 두군데 이상을 설정하고자 하는 경우에는 \* 로 하여야 합니다.

**끗**

### EndPoint

```
https://my-netlify-site-name.netlify.app/youtube

// 예시
https://bigsaigon333.netlify.app/youtube
```

### Client-Side 사용법 예시

```javascript
try {
  const ENDPOINT = "https://my-netlify-site-name.netlify.app/youtube";
  const URL = `${ENDPOINT}/search?part=snippet&maxResults=10&&q=${query}`;
  // 기존
  // const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&&q=${query}}&key=${YOUR_OWN_API_KEY}`;

  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const body = await response.json();
  const { nextPageToken, items } = body;

  // write a code below that you want to do here!
  //
  //
} catch (error) {
  console.error(error);
}
```
