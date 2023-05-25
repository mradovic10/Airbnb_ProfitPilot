// Parse your data
let data = [
    { listing_url: 'https://www.airbnb.com/rooms/6606', accommodates: 1, beds: 1, zipcode: 98103, amenities_cat: 'basic', bedrooms_cat: 1, price_cat: '25th-50th', latitude: 47.65444, longitude: -122.33629 },
    // ... add the rest of your rows here
];

let traces = [];

data.forEach((listing) => {
    let trace = {
        lon: [listing.longitude],
        lat: [listing.latitude],
        hoverinfo: 'text',
        text: [
            `Listing: ${listing.listing_url}<br>` +
            `Accommodates: ${listing.accommodates} people<br>` +
            `Beds: ${listing.beds}<br>` +
            `Zipcode: ${listing.zipcode}<br>` +
            `Amenities Category: ${listing.amenities_cat}<br>` +
            `Bedrooms Category: ${listing.bedrooms_cat}<br>` +
            `Price Category: ${listing.price_cat}`
        ],
        mode: 'markers',
        marker: {
            size: 10,
            opacity: 0.6
        },
        name: `Accommodates ${listing.accommodates} people`
    };
    traces.push(trace);
});

let layout = {
    title: 'Airbnb Listings',
    showlegend: true,
    geo: {
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: 'rgb(255,255,255)',
        countrycolor: 'rgb(255,255,255)'
    }
};

Plotly.newPlot('myDiv', traces, layout, {responsive: true});
