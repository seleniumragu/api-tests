import request from '../config/common'

import { expect } from 'chai';

describe('Orders', () => {
    let orderID;

    describe('POST', () => {
        it('/Orders', async () => {
            const data = {
                "stops": [
                    {
                        "lat": 22.344674, "lng": 114.124651
                    },
                    {
                        "lat": 22.375384, "lng": 114.182446
                    },
                    {
                        "lat": 22.385669, "lng": 114.186962
                    }
                ]
            }
            const res = await request
                .post('/v1/orders').send(data).then(res => {
                    console.log(res.body);
                    ordersId = res.body.id;
                    console.log(orderID)
                    expect(201);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id), to.be.eq(orderID)
                });
        });

        it('/Orders with advance date', async () => {
            const data = {
                "orderAt": "2021-09-03T13:00:00.000Z",
                "stops": [
                    {
                        "lat": 22.344674, "lng": 114.124651
                    },
                    {
                        "lat": 22.375384, "lng": 114.182446
                    },
                    {
                        "lat": 22.385669, "lng": 114.186962
                    }
                ]
            }
            const res = await request
                .post('/v1/orders').send(data).then(res => {
                    ordersId = res.body.id;
                    console.log(orderID)
                    expect(201);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id), to.be.eq(orderID)

                });
        });

    });

    describe('GET', () => {
        //Get method Asynchronus behaviour with done call back
        it('/Orders Asynchronus behaviour with done call back', async (done) => {
            const res = await request
                .get(`/v1/orders/${orderID}`).end((err, res) => {
                    console.log(err);
                    console.log(res.body);
                    expect(200);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq(orderID)
                    done();
                });
        });

        //Get method Asynchronus behaviour with return
        it('/Orders with return callback', async () => {
            const res = await request
                .get(`/v1/orders/${orderID}`).then((res) => {
                    expect(200);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq(orderID)
                });
        });
        //Get method Asynchronus behaviour with return
        it('/Orders with return callback', async () => {
            const res = await request
                .get('/v1/orders/.1').then((res) => {
                    expect(404);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.not.be.eq(orderID)
                });
        });
    });

    describe('PUT', () => {
        it('/Orders to take', async () => {
            const res = await request
                .put(`/v1/orders/${orderID}/take`)
                .then((res) => {
                    expect(200);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq({ orderID })
                });
        });

        it('/Orders complete', async () => {
            const res = await request
                .put(`/v1/orders/${orderID}/complete`)
                .then((res) => {
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq({ orderID })
                });
        });

        it('PUT /Orders cancel', async () => {
            const res = await request
                .put(`/v1/orders/${orderID}/cancel`)
                .then((res) => {
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq({ orderID })
                });
        });
    });
});
