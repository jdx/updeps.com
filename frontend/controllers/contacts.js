'use strict';

var app = require('../app');

module.exports = app.controller('ContactsController', function($scope, Restangular) {
    $scope.contacts = Restangular.all('contacts').getList().$object;

    $scope.add = function(contact) {
        contact.updating = true;
        $scope.contacts.post(contact)
        .then(function(c) {
            $scope.contacts.push(c);
            $scope.newContact = null;
        });
    };
    $scope.remove = function(contact) {
        contact.remove().then(function() {
            var i = $scope.contacts.indexOf(contact);
            $scope.contacts.splice(i, 1);
        });
    };
    $scope.edit = function(contact) {
        contact.editing = true;
        contact.edit = contact.clone();
    };
    $scope.update = function(contact) {
        contact.edit.updating = true;
        contact.edit.put().then(function(c) {
            var i = $scope.contacts.indexOf(contact);
            $scope.contacts[i] = c;
            contact.editing = false;
        });
    };
});
