# IME
IME provides to control Input Method Editor.

## Supported platforms
* sectv-orsay
* sectv-tizen
* tv-webos

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
