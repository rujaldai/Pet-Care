module.exports = (function() {
    'use strict';

    const UserTypeEnum = {
        SYSTEM_ADMIN: "ADMIN",
        MEMBER_USER: "USER",
        MERCHANT_USER: "MERCHANT",
        properties: {

        },
        exists: function (userType) {
            for (var key in UserTypeEnum) {
                if(UserTypeEnum[key] === userType) {
                    return true;
                }
            }
            return false;
        }
    };

    return UserTypeEnum;
})();
