const $youtubeForm = document.querySelector("#youtube-form");
const $youtubeInput = document.querySelector("#youtube-input");
const $dummyButton = document.querySelector("#dummy");

const REAL_ENDPOINT = "/youtube/v3/search";
const DUMMY_ENDPOINT = "/youtube/v3/dummy/search";

const testFetch = async (ENDPOINT, query = "코요태") => {
  try {
    const parameters = new URLSearchParams({
      type: "video",
      part: "snippet",
      maxResults: 10,
      q: query,
    });
    const url = `${ENDPOINT}?${parameters.toString()}`;

    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error.message);
    }

    console.log(body);
  } catch (error) {
    console.error(error.message);
  }
};

$youtubeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  testFetch(REAL_ENDPOINT, $youtubeInput.value);
});
$dummyButton.addEventListener("click", () => testFetch(DUMMY_ENDPOINT));
