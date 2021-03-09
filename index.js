const $youtubeForm = document.querySelector("#youtube-form");
const $youtubeInput = document.querySelector("#youtube-input");
const $dummyButton = document.querySelector("#dummy");

const REAL_ENDPOINT = "https://bigsaigon333.netlify.app/youtube";
const DUMMY_ENDPOINT = "https://bigsaigon333.netlify.app/youtube/dummy";

const testFetch = async (ENDPOINT, query = "코요태") => {
  try {
    const URL = `${ENDPOINT}/search?part=snippet&maxResults=10&q=${query}`;

    const response = await fetch(URL);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error.message);
    }

    console.log(body);
  } catch (error) {
    console.error(error);
  }
};

$youtubeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  testFetch(REAL_ENDPOINT, $youtubeInput.value);
});
$dummyButton.addEventListener("click", () => testFetch(DUMMY_ENDPOINT));
