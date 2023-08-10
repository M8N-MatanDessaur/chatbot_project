const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async function(event, context) {
  try {
    // Extract conversation history and user input from request parameters
    const conversationHistory = event.queryStringParameters.history || "";
    const userInput = event.queryStringParameters.input;

    // Prepare messages for the API call
    const messages = [
      { "role": "system", "content": "You are an AI assistant designed to answer the user's questions." },
      { "role": "user", "content": conversationHistory },
      { "role": "user", "content": userInput }
    ];

    // Call OpenAI's createChatCompletion
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.5,
    });

    if (completion && completion.data && completion.data.choices && completion.data.choices.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ output: " " + completion.data.choices[0].message.content.trim() }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ output: `Oh oh ... Something happened, try again` }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" + error }),
    };
  }
};
