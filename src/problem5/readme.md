## Description

Simple, minimalist backend server with Express in typescript

## Prerequisites
- Node.js (v16+)
- npm

## Configuration

To configure port number, rename .env.example to .env and edit the PORT parameter

## Setup

1. **Install dependencies:**

    npm install

2. **Building**

    npm run build

3. **Running**

    npm start




## APIs and Examples

**Create Item**

curl -X POST http://localhost:3000/items \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Mechanical Keyboard",
           "description": "RGB Backlit with Brown Switches",
           "category": "Electronics"
         }'

**List Items**

curl -X GET http://localhost:3000/items

**Listing with filter**

curl -X GET "http://localhost:3000/items?category=Electronics"

**Get Item by Id**

curl -X GET http://localhost:3000/items/1

**Update Details of One Item**

curl -X PUT http://localhost:3000/items/1 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Mechanical Keyboard v2",
           "description": "Wireless with Blue Switches",
           "category": "Electronics"
         }'

**Delete One Item by Id**

curl -X DELETE http://localhost:3000/items/1