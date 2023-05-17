var error = 'Single quote or < should not be accepted.'


const fetchSerachPostList = require('./queries');

test('Testing sqli', () => {
    expect(fetchSerachPostList("'")).toThrow(error);
}
)

test('Testing XSS', () => {
    expect(fetchSerachPostList("<")).toThrow(error);
}
)