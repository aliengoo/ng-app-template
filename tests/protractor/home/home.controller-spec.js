describe('angularjs home controller test', function() {
  it('should add add some details to a user', function() {
    browser.get('http://localhost:3000/#/faker-user');

    element(by.model('todoText')).sendKeys('write a protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write a protractor test');
  });
});

