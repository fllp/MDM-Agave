var mdm = mdm || {};

(function (mdm, $) {
    window.debugging_login = true;

    var add_dummy_data = function () {
        /*
        Some users:
            - username
            - gecos info (http://en.wikipedia.org/wiki/Gecos_field)
            - status
        */
        mdm_add_user(
            "clarkk",
            "Clark Kent",
            "Already logged in"
        );
        mdm_add_user(
            "brucew",
            "Bruce Wayne",
            ""
        );

        /*
        Some sessions:
            - display name
            - session.desktop
        */
        mdm_add_session(
            "Cinnamon",
            "cinnamon.desktop"
        );
        mdm_add_session(
            "Mate",
            "mate.desktop"
        );
        mdm_add_session(
            "Gnome",
            "gnome3.desktop"
        );

        /*
        Some locales:
            - display name
            - locale
        */
        mdm_add_language(
            "English",
            "en_US.UTF-8"
        );
        mdm_add_language(
            "Chinese",
            "zh_CN.UTF-8"
        );
        mdm_add_language(
            "Spanish",
            "es_AR.UTF-8"
        );
        mdm_add_language(
            "French",
            "fr_FR.UTF-8"
        );
        mdm_add_language(
            "Dummy",
            "du_DU"
        );
    };

    var parse_text_tokens = function () {
        var body = $('body').html();

        body = body.replace(
            '$lsb_description',
            'MDM Theme Developer by Max Glenister'
        );
        body = body.replace(
            '$login_label',
            'Login'
        );
        body = body.replace(
            '$ok_label',
            'OK'
        );
        body = body.replace(
            '$cancel_label',
            'Cancel'
        );
        body = body.replace(
            '$enter_your_username_label',
            'Please enter your username'
        );
        body = body.replace(
            '$enter_your_password_label',
            'Please enter your password'
        );
        body = body.replace(
            '$hostname',
            'MDM Theme Developer'
        );
        body = body.replace(
            '$shutdown',
            'Shutdown'
        );
        body = body.replace(
            '$suspend',
            'Suspend'
        );
        body = body.replace(
            '$quit',
            'Quit'
        );
        body = body.replace(
            '$restart',
            'Restart'
        );
        body = body.replace(
            '$session',
            'Session'
        );
        body = body.replace(
            '$selectsession',
            'Select a session'
        );
        body = body.replace(
            '$defaultsession',
            'Default session'
        );
        body = body.replace(
            '$language',
            'Language'
        );
        body = body.replace(
            '$selectlanguage',
            'Select a language'
        );
        body = body.replace(
            '$areyousuretoquit',
            'Are you sure you want to quit?'
        );
        body = body.replace(
            '$close',
            'Close'
        );
        body = body.replace(
            '$locale',
            'en_US.UTF-8'
        );

        $('body').html(body);
    };
    var onload_finished = function() {
        set_welcome_message("Welcome to the MDM Theme Developer");
        mdm_msg("Please enter your username");
        mdm_set_current_language("English (USA)", "en_US.UTF-8");
        mdm_prompt("Username: ");
    };
    window.setStatus = function (message) {
        console.log(message);
    };
    window.mdm_wm_warn_dialog = function (message) {
        var confirm_status = window.confirm(message);
        if (confirm_status) {
            setStatus('Clicked okay');
        } else {
            setStatus('Clicked cancel');
        }
    };
    window.set_welcome_message = window.set_welcome_message || function (message) {
        console.log(message);
    };
    window.mdm_login_done = window.mdm_login_done || function () {
        console.log('Set mdm_login_done from dummy.js');
    };

    var window_alert = window.alert;
    window.alert = function (message) {
        var data = message.split('###');
        if (data.length === 2) {
            var action = data[0];
            var param = data[1];

            if (action === 'LOGIN') {
                if (this.userName) {
                    setStatus('Logged in as ' + this.userName + ', with password ' + param);
                    this.userName = null;
                    mdm_error("Can't log in inside emulator!");
                    mdm_prompt('Username:');
                } else {
                    this.userName = param;
                    setStatus('Entered user: ' + param);
                    mdm_noecho('Password:');
                }
            }
            else if (action === 'LANGUAGE') {
                setStatus('Language: ' + param);
            }
            else if (action === 'SESSION') {
                setStatus('Session: ' + param);
            }
            else if (action === 'SHUTDOWN') {
                setStatus('Shutdown');
                mdm_wm_warn_dialog('Are you sure you want to Shut Down the computer?')
            }
            else if (action === 'SUSPEND') {
                setStatus('Suspend');
                mdm_wm_warn_dialog('Are you sure you want to suspend the computer?')
            }
            else if (action === 'RESTART') {
                setStatus('Restart');
                mdm_wm_warn_dialog('Are you sure you want to restart the computer?')
            }
            else if (action === 'FORCE-SHUTDOWN') {
                setStatus('Force Shutdown');
            }
            else if (action === 'FORCE-SUSPEND') {
                setStatus('Force Suspend');
            }
            else if (action === 'FORCE-RESTART') {
                setStatus('Force Restart');
            }
            else if (action === 'QUIT') {
                setStatus('Quit');
            }
            else if (action === 'XDMCP') {
                setStatus('Xdmcp');
            }
            else if (action === 'USER') {
                this.userName = param;
                mdm_noecho('Password:');
                setStatus('Selected user: ' + param);
            }
            else {
                setStatus('Unknown command received from the Webkit greeter: ' + action);
            }
            return 1;
        }
        window.webkit_on_console_message = function (message) {
            console.log(message);
            return 0;
        }
        window.webkit_on_error = function (message) {
            console.error(message);
            return 0;
        }
        window.webkit_on_resource_failed = function (message) {
            console.warn(message);
        }
    };
    mdm.init = function () {
        $(function (){
            add_dummy_data();
            // parse_text_tokens();
            // onload_finished();
        });
    };
}(mdm, jQuery));

mdm.init();
