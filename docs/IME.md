# IME
IME provides to control Input Method Editor.

## Supported platforms
* sectv-orsay
* sectv-tizen
* tv-webos

<table>
  <tr align="center">
    <td rowspan="2" style="">Method Name</td>
    <td rowspan="2" style="">Browser</td>
    <td colspan="2" style="">Legacy Samsung Smart TV</td>
    <td colspan="2" style="">Tizen Samsung Smart TV</td>
    <td colspan="2" style="">WebOS LG Smart TV</td>
    <td rowspan="2" style="">MEMO</td>
  </tr>
  <tr align="center"><td>Emulator (ver 5.1)</td><td>Device ('12 - '14)</td><td>Emulator (ver 2.3.1)</td><td>Device ('15 - '16)</td><td>Emulator (ver 3.0.0)</td><td>Device ('14 - '16)</td></tr>
  <tr align="center"><td></td><td>X</td><td>X</td><td>O</td><td>O</td><td>O</td><td>O</td><td>O</td><td>Cancel event is not supported on webos platform.<br>It has restrictions not to occur blur event when closing IME using return key.
</td></tr>
 </table>

## Full WebIDL
```WebIDL
module IME {
    enum IMEEventType {
        'submit',
        'cancel',
        'blur'
    };
};
```

## Examples
* Examples
    1. Showing IME and adding event on Tizen, Legacy.

        ```js
        imeEle = document.getElementById('searchText'); // 'searchText' : id of input tag

        imeEle.addEventListener('submit', function (e) {
            console.log("The DONE button of IME is pushed");
        });

        imeEle.addEventListener('cancel', function (e) {
            console.log("The CANCEL button of IME is pushed");
        });

        imeEle.addEventListener('blur', function (e) {
            console.log("The INPUT element loses focus");

            if(imeEle.getAttribute('data-ime-show') == 'false') {
                console.log("The IME is closed");
            }

        });

        imeEle.focus();
        ```

    2. Showing IME and adding event on Webos. (On Webos platform, cancel event is not supported.)

        ```js
        imeEle = document.getElementById('searchText'); // 'searchText' : id of input tag

        imeEle.addEventListener('submit', function (e) {
            console.log("The DONE button of IME is pushed");
        });

        imeEle.addEventListener('blur', function (e) {
            console.log("The INPUT element loses focus");

            if(imeEle.getAttribute('data-ime-show') == 'false') {
                console.log("The IME is closed");
            }

        });
        
        imeEle.focus();
        ```

## See others
None
