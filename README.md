# JWT | Access tokens & Refresh tokens

The deployed version of [refresh token app](https://thomas-melchers-refreshtoken.netlify.app/)

## PURPOSE OF JWT-refresh-Token

Learning how JWT access and refresh token work and practise TypeScript.

### How does it work ? 

When the user logs in, a session is created with an access token is generated for 5sec and a refresh token for 1 year. All these information are stored into cookies. 
When you ask for the session details, you receive all the infos from the accessToken with its validity. After 5 seconds, if you press again on session you will have a new session and an extended 5 seconds validity due to the refresh token. If you don't have it, you will be disconnected.

![](/wireframe.png)

## FEATURES

- Account Creation
- Login
- Get Session 
- Delete Session


## DEPLOYEMENT

- Front-End : Netlify
- Back-End : Heroku

## TECHNOLOGIES 

- Typescript
- Node.js 
- React
- MongoDB
- Mongoose
- yarn

