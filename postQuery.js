module.exports = function (request, API_KEY) {
  return fetch(
    `https://api.openai.com/v1/engines/text-davinci-003/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: request,
        max_tokens: 3000,
        temperature: 0.9,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
        console.log(`answer received ${data.choices[0].text}`);
        return data.choices[0].text;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Failed to fetch response from OpenAI API");
    });
};
