# Scoreboard Service Module

## 1. Overview

The Scoreboard Service performs real-time live update of top 10 leaders scoreboard based on API calls. We are assuming the service will be call via other services in a microservice architecture. Use docker containers for easy deployment and scaling.

## 2. Security

The Service should be running in a private subnet accessible only over the Internal API Gateway.

## 3. Technical Stack

    Engine : NodeJS
    Language : TypeScript
    Data Store: Redis
    Database : PostgreSQL or Any Existing Database in System
    Communications : Websockets
    Containerization : Docker

## 4. Required APIs

### Update Score

```
    Endpoint : POST /update-score
    Auth : JWT M2M Token by OAuth Provider
    Request Body : {
    "actionId": "uuid-v4-string",
    "payload": { 
        "serviceId" : "Calling Service Id, Integer, not null",
        "amountToUpdate" : "score amount to update, Int > 0, not null",
        "notes" : "misc text nullable"
        },
    "signature": "hmac-sha256-hash"
    }
```

### Top 10 List Websocket

    /leaderboard
* On Connection: Send the current Top 10 to the client.
* On Update: Broadcast the the new Top 10 list to all connected clients

## 5. Start Up

Steps to implement at service start up

1. Check Redis and Database Connections
2. Clear Redis User Score Storage
3. Query Database for Top 10 User Scores and Fill it in Redis (ZSET)
4. Accept API calls only after start up

## 6. API Workflow

#### Steps for other services which will be calling Scoreboard Service (No Need To Implement)
1. OAuth Provider assigns (scores:write) scope for calling service.
2. Calling Service requests M2M Token from OAuth Provider
3. Other Service calls Update Score API using M2M Token and provided request body format.

#### Steps for Scoreboard Service (Implement)

1. Verify Token Issuer is correct.
2. Verify Token have (scores:write) scope.
3. Check against Database whether actionId already exists (prevents double calling)
4. Check Request Body Format
5. Update user total score in database, returning total score value. Insert actionId and parameters into DB for record keeping. Do both in one Query.
6. Insert or Update User Score in Redis(ZSET)
7. If the update pushes the user into the Top 10 in Redis or changes their position within top 10, Trigger WebSocket event leaderboard_update to all connected clients.

## 7. Notes

* Split API Services and Websocket Service for better scaling

## 8. Development Team

TBD







