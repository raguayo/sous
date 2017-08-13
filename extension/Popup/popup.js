chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;
  chrome.tabs.sendMessage(tabId, {greeting: 'hello'}, (response) => {
    console.log(response)
  })
})
