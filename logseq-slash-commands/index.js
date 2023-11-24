function main () {
  logseq.Editor.registerSlashCommand(
    '💥 Big Bang',
    async () => {
      const { content, uuid } = await logseq.Editor.getCurrentBlock()

      logseq.App.showMsg(`
        [:div.p-2
          [:h1 "#${uuid}"]
          [:h2.text-xl "${content}"]]
      `)
    },
  )

  logseq.Editor.registerBlockContextMenuItem('🦜 Send A Tweet',
    ({ blockId }) => {
      logseq.App.showMsg(
        '🦜 Tweet from block content #' + blockId,
      )
    })
}
logseq.Editor.registerSlashCommand({
  id: 'chat-with-p',
  name: 'Chat with P.',
  description: 'Start a chat with P.',
  onExecute: async () => {
    const prompt = 'Hello, P.';
    const response = await connectPplxToLogseq(prompt);
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
    const response = await connectPplxToLogseq(prompt);
    console.log(response);
  },
});
// bootstrap
logseq.ready(main).catch(console.error)
