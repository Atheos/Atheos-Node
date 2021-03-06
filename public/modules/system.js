//////////////////////////////////////////////////////////////////////////////80
// System
//////////////////////////////////////////////////////////////////////////////80
// Copyright (c) Atheos & Liam Siira (Atheos.io), distributed as-is and without
// warranty under the MIT License. See [root]/docs/LICENSE.md for more.
// This information must remain intact.
//////////////////////////////////////////////////////////////////////////////80
// Description: 
// The System Module initializes the core Atheos object and puts the engine in
// motion, calling the initilization of other modules, and publishing the
// Amplify 'system.load[]' events.
//
//												- Liam Siira
//////////////////////////////////////////////////////////////////////////////80

(function(global) {
	var running = false;

	var atheos = global.atheos = {
		
		path: window.location.href,
		controller: 'controller',
		dialog: 'dialog',

		init: function() {
			window.addEventListener('error', atheos.error);
			if (running) {
				return;
			}

			// global.i18n = atheos.i18n.translate;
			atheos.i18n.init();
			atheos.common.init();

			//Synthetic Login Overlay
			if (document.querySelector('#login')) {
				global.synthetic.init();
				atheos.toast.init();
				// atheos.user.init();
			} else if (document.querySelector('#installer')) {
				global.synthetic.init();
				atheos.install.init();
			} else {
				// Atheos has three levels of priority loading:
				//	Critical components should load on major
				//	Features should load on minor
				//	Plugins should load on extra
				carbon.publish('system.loadMajor');
				carbon.publish('system.loadMinor');
				carbon.publish('system.loadExtra');

				// Settings are initialized last in order to ensure all listeners are attached
				atheos.settings.init();
			}

			log([
				'   _____   __   __                        ',
				'  /  _  \\_/  |_|  |__   ____  ____  ______',
				' /  /_\\  \\   __\\  |  \\_/ __ \\/  _ \\/  ___/',
				'/    |    \\  | |   Y  \\  ___(  <_> )___ \\ ',
				'\\____|__  /__| |___|  /\\___  >____/____  >',
				'        \\/          \\/     \\/          \\/ '
			].join('\n'));

		}
	};
	//////////////////////////////////////////////////////////////////////
	// Init
	//////////////////////////////////////////////////////////////////////
	document.addEventListener('DOMContentLoaded', function() {
		atheos.init();
		running = true;
	});

})(this);