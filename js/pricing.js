/**
 * Detects user location and updates pricing currency.
 * Defaults to USD (as defined in HTML). Switches to GHS if user is in Ghana.
 */
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://get.geojs.io/v1/ip/country.json')
        .then(response => response.json())
        .then(data => {
            // Check if country is Ghana (GH)
            if (data.country === 'GH') {
                // Update Currency Symbols to Cedi
                document.querySelectorAll('.currency-symbol').forEach(el => el.textContent = '₵');

                // Update Price Amounts using the data-ghs attribute
                document.querySelectorAll('.price-amount').forEach(el => {
                    const ghsPrice = el.getAttribute('data-ghs');
                    if (ghsPrice) el.textContent = ghsPrice;
                });
            }
        })
        .catch(error => console.warn('Location detection failed, keeping default currency.', error));
});