console.log(chrome.tabs);
chrome.tabs.query({}, (res) => {
  console.log(res);
});
