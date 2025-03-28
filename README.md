webble
======

__webble__ is a client-side utility which facilitates pairing and exchanging data with BLE devices using the Web Bluetooth API.

![Overview of webble.js](https://reelyactive.github.io/webble/images/overview.png)

__webble__ is lightweight client-side JavaScript that runs in the browser.  See a live demo using the code in this repository at: [reelyactive.github.io/webble](https://reelyactive.github.io/webble)


Hello webble!
-------------

Include in an _index.html_ file the __webble.js__ script:

```html
<html>
  <head></head>
  <body>
    <button id="startbutton"> Start </button>
    <script src="js/webble.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
```

Include in a _js/app.js_ the code to connect to a Bluetooth Low Energy device using webble:

```javascript
const REQUEST_OPTIONS = { acceptAllDevices: true };
startbutton.addEventListener('click', () => {
  webble.requestDeviceAndConnect(REQUEST_OPTIONS, (error) => {
    /* Read and write characteristics, etc. */
  });
});
```

Open the _index.html_ file in a web browser and click Start for __webble__ to begin scanning for Bluetooth Low Energy devices in range.


Supported functions
-------------------

__webble__ supports the following functions which are essentially convenience wrappers around a subset of the Web Bluetooth API methods, using callbacks rather than Promises.

### isAvailable

```javascript
webble.isAvailable((isAvailable) => {
  if(isAvailable) { /* Web Bluetooth is supported by this browser */ }
  else { /* Web Bluetooth is NOT supported by this browser */ }
});
```

### requestDeviceAndConnect

```javascript
const REQUEST_OPTIONS = { /* See below */ };
webble.requestDeviceAndConnect(REQUEST_OPTIONS, (error) => {
  if(error) { /* The connection was unsuccessful */ }
  else { /* webble.device is connected */ }
});
```

For a complete definition of REQUEST_OPTIONS, see the [MDN web docs for requestDevice()](https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice#parameters).

### on

```javascript
webble.on('connect', (device) => {});
webble.on('disconnect', () => {});
```

### discoverServicesAndCharacteristics

```javascript
webble.discoverServicesAndCharacteristics((error) => {
  if(!error) {
    /* webble.device.services and webble.device.characteristics populated */
  }
});
```

### readCharacteristic

```javascript
let uuid = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
webble.readCharacteristic(uuid, (error, value) => {
  if(!error) { /* value is a DataView */ }
});
```

### writeCharacteristic

```javascript
let uuid = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
let value = Uint8Array.of(123); // Value must be a typed array
webble.writeCharacteristic(uuid, value, (error) => {
  if(!error) { /* Characteristic write successful */ }
});
```

### disconnect

```javascript
webble.disconnect();
```


Supported variables
-------------------

| Variable        | Type   | Description                                      |
|:----------------|:-------|:-------------------------------------------------|
| `webble.device` | Object | Subset of BluetoothDevice, adding services & characteristics, each as a Map |


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2025 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.