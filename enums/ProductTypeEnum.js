module.exports = (function() {
    'use strict';

    const ProductTypeEnum = {
        PET: "PETS",
        ACCESSORIES: "ACCESSORIES",
        SERVICE: "SERVICES",
        properties: {

        },
        exists: function (productType) {
            for (var key in ProductTypeEnum) {
                if(ProductTypeEnum[key] === productType) {
                    return true;
                }
            }
            return false;
        }
    };

    return ProductTypeEnum;
})();
