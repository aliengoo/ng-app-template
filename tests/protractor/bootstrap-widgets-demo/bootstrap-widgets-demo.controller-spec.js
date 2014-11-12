describe('boostrap widdgets demo', function() {
  it('should add add some details to a user', function() {
    browser.get('http://localhost:3000/#/bootstrap-widgets-demo');

    element(by.name('details')).sendKeys('Hello');



    var todoList = element.all(by.repeater('todo in todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write a protractor test');
  });
});


