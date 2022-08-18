'use strict';

const { createPackage, packageDelivered } = require("../src/vendor.js");
const events  = require('../src/events.js');

const payload = {
    store: 'Test Store',
    orderId: 12345,
    customer: 'John Smith',
    address: 'Seattle, Washington',
}

describe('vendor system', () => {

    let consoleLog;
    let emit;

    beforeEach(() => {
        emit = jest.spyOn(events, 'emit');
        consoleLog = jest.spyOn(console, 'log');
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.useRealTimers();
    })

    it('emits a new package', () => {
        const order = createPackage('Test Store');
        jest.runAllTimers();
        expect(emit).toHaveBeenCalled();
        expect(order.store).toBe('Target');
        expect(order.customer).toBe('John Smith');
        expect(order.orderId).toBe(12345);
        expect(order.address).toBe('Seattle, Washington');
    });
    
    it('logs that the package has been delivered with a customer name', () => {
        const order = packageDelivered(payload);
        jest.runAllTimers();
        expect(consoleLog).toHaveBeenCalled();   
        expect(order).toBe('Thank you, John Smith');   
    });
});