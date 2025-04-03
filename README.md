Shopping Basket Price Calculator

This JavaScript program calculates the total price of a shopping basket while applying special offers on certain items.

Features

Supports pricing for Apples, Bananas, Melons, and Limes.

Applies the following discounts:

Melons: Buy one, get one free.

Limes: Three for the price of two.

Returns the total price in p.

Usage

Function Definition

The main function calculateTotalCartAmount(basket) takes an array of item names and returns the total cost.

Example

console.log(calculateTotal(['Apple', 'Apple', 'Banana', 'Melon', 'Melon', 'Lime', 'Lime', 'Lime', 'Lime']));

Output:

Total: 170p

How It Works

Prices and offers are defined in objects.

The function counts the occurrences of each item.

It applies any applicable discounts.

The total cost is calculated and formatted in p.

Setup

Copy the JavaScript code into a .js file.

Run the script using Node.js:

node Shopping_test.js
