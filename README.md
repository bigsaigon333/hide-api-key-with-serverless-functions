# hide-api-key-with-serverless-functions

[![Netlify Status](https://api.netlify.com/api/v1/badges/3c98c36b-95c2-4c8d-a3d9-ab5f9342c128/deploy-status)](https://app.netlify.com/sites/bigsaigon333/deploys)

### 이 레포지토리는 Client-Side 에서 API Key를 노출하지 않고 Youtube API와 통신하기 위한 redirect server 입니다.

serveless functions 중 Netlify Functions를 활용하였습니다. 따라서 netlify 계정이 반드시 필요합니다. (netlify sign up은 무료입니다)



### 1. 설정방법

1. **repository를 fork 합니다.**

2. **netlify 에 github repository를 등록합니다.**

   - [Netlify signup 링크](https://app.netlify.com/signup)
   - fork한 repository 와 main 브랜치를 선택하며, 이외의 설정(Build Command, Publish Directory)은 공란으로 두세요. 
     (Functions directory 설정은 netlify.toml에서 하고 있으므로 신경쓰지 않아도 됩니다.)

3. **netlify 에 환경변수를 설정합니다.**

   아래의 환경변수는 반드시 설정해야 합니다. 또한 환경변수를 설정한 후에는 반드시 deploy를 하여야 합니다. 새로이 deploy한 후에 변경된 환경변수가 적용됩니다.

   - API_KEY: Youtube API Key

   - HOST: CORS 를 위한 Origin으로, Response 헤더의 Access-Control-Allow-Origin: HOST 로 설정됩니다.

```
     예시) *,  https://bigsaigon333.github.io, http://localhost:5500, http://127.0.0.1:5500

     ※ HOST는 하나만 설정할 수 있습니다. 따라서, 두군데 이상을 설정하고자 하는 경우에는 * 로 하여야 합니다.
```

<img src="https://images.velog.io/images/bigsaigon333/post/bf20c3a5-deab-410c-9042-deffc45d6459/Untitled%204.png" style="zoom:67%;" />
⇒ 이로써 설정을 모두 마쳤습니다. 환경변수 설정후 deploy하는거 꼭 잊지 마세요!



### 2. EndPoint

```
https://my-netlify-site-name.netlify.app/youtube

// 예시
https://bigsaigon333.netlify.app/youtube
```



### 3. Client-Side 사용법

기존에는 Youtube API Endpoint 인 `https://www.googleapis.com/youtube/v3/search` 으로 직접 통신하였다면 이제부터는 방금 만든 Netlify Functions의 Endpoint와 통신하시면 됩니다.

```
// Endpoint
https://my-netlify-site-name.netlify.app/youtube

// 🌟New Feature: dummy data를 반환하는 Endpoint🌟
https://my-netlify-site-name.netlify.app/youtube/dummy

// 예시
https://bigsaigon333.netlify.app/youtube
```



**구체적인 Client-Side 사용법 예시**

```jsx
try {
  // 기존
  // const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&&q=${query}&key=${YOUR_OWN_API_KEY}`;

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



### 🔥 주의사항 🔥

Netlify Functions의 무료사용량 한도는 아래와 같습니다. Netlify 설정에서 확인할 수 있습니다.

- 1달간 125,000 Request

- 1달간 functions run time 100시간

  

### 🌟 New Feature: Dummy Data를 반환하는 Endpoint 추가 🌟

Youtube API는 일일 제한량이 있으므로 이를 초과하여 사용한 경우에 403 Error를 보냅니다.

Youtube API를 사용하지 않아 제한량에 영향을 주지 않고, 서버에 저장되어 있는 Dummy Data를 랜덤하게 반환하는 Endpoint를 추가하였습니다.
(현재 33종류의 데이터를 랜덤으로 반환합니다. )

```
// 🌟 New Feature: dummy data를 반환하는 Endpoint 🌟
https://my-netlify-site-name.netlify.app/youtube/dummy
```



더욱 상세한 설명은 아래의 블로그를 참고해주세요~!

- [bigsaigon333 - Client-Side에서 Youtube API Key 숨기기](https://velog.io/@bigsaigon333/Client-Side%EC%97%90%EC%84%9C-Youtube-API-Key-%EC%88%A8%EA%B8%B0%EA%B8%B0)

- [365kim - 쉽게 쓰인 유튜브 API 튜토리얼](https://365kim.tistory.com/93)