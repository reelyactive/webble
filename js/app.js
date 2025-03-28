/**
 * Copyright reelyActive 2025
 * We believe in an open Internet of Things
 */


// Constant definitions
const REQUEST_OPTIONS = {
    acceptAllDevices: true,
    optionalServices: [ '6e400001-b5a3-f393-e0a9-e50e24dcca9e' ] // UART
};


// DOM elements
let webbledevice = document.querySelector('#webbledevice');


// Variable definitions
let peripheral;


// Display the Web BLE card if the browser supports the experimental feature
webble.isAvailable((isAvailable) => {
  if(isAvailable) { webblecard.removeAttribute('hidden'); }
});

// Handle button clicks
webbleconnect.addEventListener('click', handleConnectButton);
webbledisconnect.addEventListener('click', handleDisconnectButton);

// Handle webble events
webble.on('connect', (device) => {
  peripheral = device;
  webbleconnect.disabled = true;
  webbledisconnect.disabled = false;
  webbledevice.textContent = JSON.stringify(peripheral, null, 2);
});
webble.on('disconnect', () => {
  peripheral = null;
  webbleconnect.disabled = false;
  webbledisconnect.disabled = true;
  webbledevice.textContent = 'null';
});

// Handle a connect button click
function handleConnectButton() {
  clearWebbleError();

  webble.requestDeviceAndConnect(REQUEST_OPTIONS, (error) => {
    if(error) { return handleWebbleError(error); }

    webble.discoverServicesAndCharacteristics((error) => {
      if(error) { return handleWebbleError(error); }
      webbledevice.textContent = JSON.stringify(peripheral, null, 2);
    });
  });
}

// Handle a disconnect button click
function handleDisconnectButton() {
  webble.disconnect();
}

// Clear a webble error
function clearWebbleError() {
  webblealert.textContent = '';
  webblealert.hidden = true;
}

// Handle a webble error
function handleWebbleError(error) {
  webblealert.textContent = error;
  webblealert.hidden = false;
}