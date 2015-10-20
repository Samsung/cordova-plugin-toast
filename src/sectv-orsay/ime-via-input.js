/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.addEventListener('focus', function (e) {
	if(e.target && e.target.tagName.toUpperCase() === 'INPUT' && (e.target.type === 'text' || e.target.type === 'password')) {
		onFocus(e.target);
	}
});
window.addEventListener('blur', function (e) {
	if(e.target && e.target.tagName.toUpperCase() === 'INPUT' && (e.target.type === 'text' || e.target.type === 'password')) {
		onBlur(e.target);
	}
});

var imeInstance = null;
function onFocus(elInput) {
	if(!bIMEJSInserted) {
		insertIMEJS(onFocus.bind(null, elInput));
		return;
	}

	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	/*jshint camelcase: false */
	imeInstance = new window.IMEShell_Common();

	// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	/*jshint camelcase: true */
	elInput.id = elInput.id || ('ime_'+Date.now());
	imeInstance.inputboxID = elInput.id;
	var title = elInput.getAttribute('data-ime-title') || '';
	imeInstance.inputTitle = title;

	//imeInstance.onCompleteFunc = onCompleteText;
	//imeInstance.onKeyPressFunc = onKeyCallback;
	imeInstance.context = this;
	if(elInput.type === 'password') {
		imeInstance.setPasswordMode(false);
		if(elInput.getAttribute('data-ime-show-password') === 'true') {
			imeInstance.setUseShowHidePasswordMenu(true);
		}
	}
	imeInstance.setBlockSpace(true);
	imeInstance.onShow();

	// document.addEventListener('pause', function () {
	// 	imeInstance.onClose();
	// });
}
function onBlur(elInput) {
	imeInstance.onHide();
	imeInstance = null;
}

var bIMEJSInserted = false;
function insertIMEJS(onLoad) {
	if(bIMEJSInserted) {
		return;
	}
	var count = 0;
	var scriptIme = document.createElement('script');
	scriptIme.src = '$MANAGER_WIDGET/Common/IME_XT9/ime.js';
	scriptIme.onload = checkLoaded;
	document.head.appendChild(scriptIme);
	var scriptImeInput = document.createElement('script');
	scriptImeInput.src = '$MANAGER_WIDGET/Common/IME_XT9/inputCommon/ime_input.js';
	scriptImeInput.onload = checkLoaded;
	document.head.appendChild(scriptIme);

	function checkLoaded() {
		count++;
		if(count >= 2) {
			bIMEJSInserted = true;
			onLoad && onLoad();
		}
	}
}
