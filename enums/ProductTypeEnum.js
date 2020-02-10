module.exports = (function() {
    'use strict';

    const ProductTypeEnum = {
        PET: "PET",
        ACCESSORIES: "ACCESSORIES",
        SERVICE: "SERVICE",
        properties: {

        },
        exists: function (productType) {
            for (var key in ProductTypeEnum) {
                if(UserTypeEnum[key] === productType) {
                    return true;
                }
            }
            return false;
        }
    };

    return ProductTypeEnum;
})();
