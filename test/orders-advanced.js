import request from '../config/common'
import { config, expect } from 'chai';

describe('Orders', () => {
    let orderID;

    describe('POST', () => {
        it('/Orders', () => {
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
            return request
                .post('/v1/orders').send(data).then(res => {
                    ordersId = res.body.id;
                    expect(res.body.code).to.be(201);
                    expect(res.body.data.message).to.eq('Created')
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq(orderID)

                });
        });
        it('/Orders with advance date', () => {
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
            return request
                .post('/v1/orders').send(data).then(res => {
                    ordersId = res.body.id;
                    expect(res.body.code).to.be(201);
                    expect(res.body.data.message).to.eq('Created')
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq(orderID)

                });
        });

    });

    describe('GET', () => {
        //Get method Asynchronus behaviour with return
        it('/Orders with return callback', () => {
            return request
                .get(`/v1/orders/${orderID}`).then((res) => {
                    console.log(err);
                    console.log(res.body);
                    expect(res.body.code).to.be(200);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq(orderID)
                });
        });
        //Get method Asynchronus behaviour with return
        it('/Order doesnnot exist', () => {
            return request
                .get('/v1/orders/.1').then((res) => {
                    console.log(err);
                    console.log(res.body);
                    expect(404);
                    expect(res.body.data).to.not.be.empty;
                });
        });
    });

    describe('PUT', () => {

        it('/Orders flow violated', () => {
            return request
                .put(`/v1/orders/${orderID}/complete`)
                .then((res) => {
                    expect(422);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.not.be.eq({ orderID })
                });
        });

        it('/Orders to take', () => {
            return request
                .put(`/v1/orders/${orderID}/take`)
                .then((res) => {
                    expect(200);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq({ orderID })
                    expect(res.body.data.status).to.be.eq("ONGOING")
                });
        });

        it('/Orders does not exist', () => {
            return request
                .put(`/v1/orders/.01/take`)
                .then((res) => {
                    expect(404);
                    expect(res.body.data).to.not.be.empty;
                });
        });


        it('/Orders complete', () => {
            return request
                .put(`/v1/orders/${orderID}/complete`)
                .then((res) => {
                    console.log(err);
                    console.log(res.body);
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq({ orderID })
                    expect(res.body.data.status).to.be.eq("COMPLETED")

                });
        });

        it('/Orders does not exist', () => {
            // order doesn't exist
            return request
                .put(`/v1/orders/.01/complete`)
                .then((res) => {
                    expect(404);
                    expect(res.body.data).to.not.be.empty;
                });
        });

        it('/Orders flow violated', () => {
            //order already completed
            return request
                .put(`/v1/orders/${orderID}/take`)
                .then((res) => {
                    expect(422);
                    expect(res.body.data).to.not.be.empty;
                });
        });


        it('PUT /Orders cancel', () => {
            return request
                .put(`/v1/orders/${orderID}/cancel`)
                .then((res) => {
                    expect(res.body.data).to.not.be.empty;
                    expect(res.body.data.id).to.be.eq({ orderID })
                    expect(res.body.data.status).to.be.eq("CANCELLED")
                });
        });

        it('/Orders does not exist', () => {
            return request
                .put(`/v1/orders/.01/cancel`)
                .then((res) => {
                    expect(404);
                    expect(res.body.data).to.not.be.empty;
                });
        });

        it('/Orders flow violated', () => {
            //order already cancelled
            return request
                .put(`/v1/orders/${orderID}/complete`)
                .then((res) => {
                    expect(422);
                    expect(res.body.data).to.not.be.empty;
                });
        });

    });
});
