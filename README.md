# hide-api-key-with-serverless-functions

### 이 레포지토리는 Client-Side 에서 API Key를 노출하지 않고 Youtube API와 통신하기 위한 redirect server 입니다.

serveless functions 중 Netlify Functions를 활용하였습니다. 따라서 netlify 계정이 반드시 필요합니다. (netlify sign up은 무료입니다)



### 1. 설정방법

1. **netlify 에 github repository를 등록합니다.**

- [Netlify signup 링크](https://app.netlify.com/signup)

- fork한 repository 와 main 브랜치를 선택하며, 이외의 설정(Build Command, Publish Directory)은 공란으로 두세요.
  (Functions directory 설정은 netlify.toml에서 하고 있으므로 신경쓰지 않아도 됩니다.)
  
  

2. **netlify 에 환경변수를 설정합니다.**

   아래의 환경변수는 반드시 설정해야 합니다. 또한 환경변수를 설정한 후에는 반드시 deploy를 하여야 합니다. 새로이 deploy한 후에 변경된 환경변수가 적용됩니다.

- API_KEY: Youtube API Key
- HOST: CORS 를 위한 Origin으로, Response 헤더의 Access-Control-Allow-Origin: HOST 로 설정됩니다.

```
// 예시
API_KEY = Yousdfjidsof-asfdliaj
HOST = https://bigsaigon333.github.io // *, http://localhost:5500, http://127.0.0.1:5500 등도 가능
```

※ HOST는 하나만 설정할 수 있습니다. 따라서, 두군데 이상을 설정하고자 하는 경우에는 \* 로 하여야 합니다.
 



### 2. EndPoint

```
https://my-netlify-site-name.netlify.app/youtube

// 예시
https://bigsaigon333.netlify.app/youtube
```



### 3. Client-Side 사용법 예시

```javascript
try {
  // 기존
  // const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&&q=${query}}&key=${YOUR_OWN_API_KEY}`;
    
  const YOUR_OWN_ENDPOINT = "https://my-netlify-site-name.netlify.app/youtube";
  const URL = `${YOUR_OWN_ENDPOINT}/search?part=snippet&maxResults=10&&q=${query}`;

  const response = await fetch(URL);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error.message); //  <-- 이렇게 하시면 디버깅하실때 매우 편합니다.
  }

  // write a code below that you want to do here!
  
  
} catch (error) {
  console.error(error);
}
```
