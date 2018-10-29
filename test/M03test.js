QUnit.test('Testing my age calculator', function (assert) {
    assert.equal();
    assert.equal(checkBirthDay(01/19/1997),"You are 21 years 9 months 17 days old","Success");
    assert.equal(checkBirthDay(11/20/1990),"You are 27 years 0 months 17 days old","created");
    assert.equal(checkBirthDay(10/21/1996),"You are 22 years 1 months 17 days old","generated");
    assert.equal(checkBirthDay(04/26/1991),"You are 26 years 7 months 17 days old","success");
   // assert.equal(checkBirthDay(2.5, 2.5, 2.5, 2.5), 10, "works with four positive real numbers");
    //assert.equal(checkBirthDay(10, -10), 0, "works with a positive and a negative");
});