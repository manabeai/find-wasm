chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    try {
      const contentTypeHeader = details.responseHeaders?.find(header => header.name.toLowerCase() === 'content-type');
      if (contentTypeHeader && contentTypeHeader.value.toLowerCase() === 'application/wasm') {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: '/WebAssembly.png',
          title: 'WASM Detected',
          message: 'This website is using WASM!',
        });
      }
    } catch (error) {
      console.error('Error processing headers:', error);
    }
  },
  {urls: ["<all_urls>"], types: ["main_frame", "sub_frame", "xmlhttprequest", "other"]},
  ["responseHeaders"]
);
