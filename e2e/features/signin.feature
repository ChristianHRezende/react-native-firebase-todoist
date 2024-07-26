@signIn
Feature: Sign In

  @signInCorrectUser
  Scenario: Sign In a valid registered user

    Given I'm a registered user 
    When access the signIn formulary
    When fill the signIn formulary with valid email and password
    When submit the signIn formulary
    Then I'm redirected to the home screen