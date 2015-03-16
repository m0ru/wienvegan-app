<restaurant-details>
    <a id="detailview" class="anchor"></a>
    <h1 class="tophandle">{opts.restaurant.name}</h1>

    <dl>
        <dt>Adress</dt>
        <dd>Barnabitengasse 6, 1060 Vienna</dd>

        <dt>Tel</dt>
        <dd>+ 43 1 581 1112</dd>

        <dt>Mobile</dt>
        <dd>+ 43 699 1920 4294</dd>

        <dt>Email</dt>
        <dd>shop@formosa.at</dd>

        <dt>Business Hours</dt>
        <dd>
            <dl>
                <dt>Mon</dt><dd>11:00 - 21:00</dd>
                <dt>Tue</dt><dd>11:00 - 21:01</dd>
                <dt>Wed</dt><dd>11:00 - 21:02</dd>
                <dt>Thu</dt><dd>11:00 - 21:03</dd>
                <dt>Fri</dt><dd>11:00 - 14:00</dd><dd>14:00 - 21:05</dd>
                <dt>Sat</dt><dd>11:00 - 21:06</dd>
                <dt>Sun</dt><dd>11:00 - 21:07</dd>
            </dl>
        </dd>

        <dt>Cuisine/Tags:</dt>
        <dd>Asian, International, Shop</dd>

    </dl>
    <h2>Further Notes:</h2>
    <p> Consetetur sadipscing elitr, causing scrolling behaviour, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>


    window.setTimeout(function () {
      console.log(JSON.stringify(opts.restaurant))
    }, 3000)
</restaurant-details>
