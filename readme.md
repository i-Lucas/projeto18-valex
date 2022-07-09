# To make correction easier:

<h2> Routes: </h2>

```js
    post('/create'); // Create a new card
    post('/activate'); // Activate a card
    get('/transactions'); // View transactions for a card
    put('/block'); // Block a card
    put('/unlock'); // Unlock a card
    post('/purchases'); // Create a new purchase
    post('/recharge'); // Recharge a card
```

# required data:

<h3> route: /create </h3>

```js
    const { employeeId, cardType } = req.body;
    const { companykey } = req.headers;
    validTypes = ['groceries', 'restaurants', 'transport', 'education', 'health'];
```

<h3> route: /activate </h3>

```js
    const { cardCVV, cardPassword } = req.body;
```

<h3> route: /transactions </h3>

```js
    const { cardId } = req.body;
```

<h3> route: /block </h3>

```js
    const { cardId, cardPassword } = req.body;
```

<h3> route: /unlock </h3>

```js
    const { cardId, cardPassword } = req.body;
```

<h3> route: /purchases </h3>

```js
    const { cardId, cardPassword, businessId, amount } = req.body;
```

<h3> route: /recharge </h3>

```js
    const { companykey } = req.headers;
    const { cardId, rechargeAmount } = req.body;
```


<h4>this API is part of a school activity</h4>