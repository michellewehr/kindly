const { concatUserNames } = require('../utils/userNamesConcat');

test('First and last names of user are concatenated into a full name string', () => {
   const firstName = 'Brent';
   const lastName = 'Gaines';

   expect(concatUserNames(firstName, lastName)).toEqual('Brent Gaines');
});