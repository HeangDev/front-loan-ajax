export const currencyFormat = (value) => new Intl.NumberFormat('th', {
    style: 'currency',
    currency: 'THB'
}).format(value);
//Example: ฿50,000.00

// export const currencyFormat = (value) => {
//     return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
// }
//Example: 50,000.00