// Existing code
const axios = require('axios');

// The pplx-api endpoint
const apiEndpoint = 'https://api.perplexity.ai';

// The Logseq API endpoint
const logseqApiEndpoint = 'http://localhost:6807';

// A function to make a request to the pplx-api
async function makeRequestToPplxApi(prompt, apiKey) {
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
async function connectPplxToLogseq(prompt, apiKey) {
  const pplxResponse = await makeRequestToPplxApi(prompt, apiKey);
  const logseqResponse = await sendCommandToLogseqApi(pplxResponse);
  return logseqResponse;
}

// New settings code
logseq.setSettings({
  apiKey: '',
});

logseq.getSettings().then(settings => {
  const apiKey = settings.apiKey;

  // Register the new command
  logseq.Editor.registerSlashCommand({
    id: 'chat-with-p',
    name: 'Chat with P.',
    description: 'Start a chat with P.',
    onExecute: async () => {
      const prompt = 'Hello, P.';
      const response = await connectPplxToLogseq(prompt, apiKey);
      console.log(response);
    },
  });

  // Register the new command
  logseq.Editor.registerSlashCommand({
    id: 'connect-pplx',
    name: 'Connect to Pplx',
    description: 'Connect to Pplx and send a prompt',
    onExecute: async () => {
      const prompt = 'Hello, world!';
      const response = await connectPplxToLogseq(prompt, apiKey);
      console.log(response);
    },
  });
});