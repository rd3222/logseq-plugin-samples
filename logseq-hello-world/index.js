const axios = require('axios');

// Your pplx-api key
const apiKey = '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';

// The pplx-api endpoint
const apiEndpoint = 'https://api.perplexity.ai';

// The Logseq API endpoint
const logseqApiEndpoint = 'http://localhost:6807';

// A function to make a request to the pplx-api
async function makeRequestToPplxApi(prompt) {
  const response = await axios.post(`${apiEndpoint}/v1/models/pplx-70b/completions`, {
    prompt: prompt,
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  return response.data;
}

// A function to send a command to the Logseq API
async function sendCommandToLogseqApi(command) {
  const response = await axios.post(`${logseqApiEndpoint}/api/command`, {
    command: command,
  });

  return response.data;
}

// A function to create a connection between pplx-70b and Logseq
async function connectPplxToLogseq(prompt) {
  const pplxResponse = await makeRequestToPplxApi(prompt);
  const logseqResponse = await sendCommandToLogseqApi(pplxResponse);

  return logseqResponse;
}

// Use the function
connectPplxToLogseq('Hello, world!');