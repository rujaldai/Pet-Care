module.exports = (function() {
    'use strict';

    const BookingStatusEnum = {
        PENDING: "PENDING",
        DELIVERED: "DELIVERED",
        CANCELED: "CANCELED",
        properties: {

        },
        exists: function (bookingStatus) {
            for (var key in BookingStatusEnum) {
                if(BookingStatusEnum[key] === bookingStatus) {
                    return true;
                }
            }
            return false;
        }
    };

    return BookingStatusEnum;
})();
