'use strict';

var _ = require('lodash');

module.exports = function () {

    /*
     * Please complete the profile object with your Gerrit data
     */
    var profile = {
        username: '',
        email: ''
    };   

    function checkProfile() {
        return _.any(profile, function (value) {
            return value === '';
        });
    }

    return {
        hasMissingData: checkProfile,
        data: profile
    };
};