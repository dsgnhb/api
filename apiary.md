FORMAT: 1A

# designhub API

REST API written in TypeScript using express and mysql


# Data Structures

## User (object)
+ userid: 180642647424106496 (UserID, required)
+ username: Fin (string, required) - Discord Username
+ discriminator: 7929 (number, required) - Discord's Username Thing
+ avatar: https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png (string, required)

## UserID (string)
userid: 180642647424106496 (string, required) - An unique identifier of the user provided by Discord

## NotFound (object)
 + error: Not found (string)

## ApiKey (string, required)


# Group Donation
Resources related to donations in the API.

## General [/donate]

### List All Donations [GET]

+ Request
    + Headers
    
            Token: (ApiKey)


+ Response 200 (application/json)
    + Attributes (array)
        + (object)
            + name: Lukas (string)
            + ip: 192.168.0.1 (string)
            + code: 1234-1234-1234-1234 (string)


### Create a New Donation [POST]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

    + Body
        
            {
                "name" : "lukas".
                "ip": "127.0.0.1",
                "code" : "0000-0000-0000-0000"
            }


+ Response 201 (application/json)
    + Attributes
        + action: add (string)



# Group Levels
Resources related to levels in the API.


## General [/levels]

### List All Levels Data [GET]

+ Request
    + Headers
    
            Token: (ApiKey)

+ Response 200 (application/json)
    + Attributes (array)
        + (User)
            + xp: 69444 (number)
            + chests: 35 (number)
            + coins: 1195 (number)
            + rank: 1 (number)



## User [/levels/{userid}]
+ Parameters
    + userid: 180642647424106496 (string) - An unique identifier of the user provided by Discord


### List Levels Data from specified User [GET]

+ Request
    + Headers
    
            Token: (ApiKey)
            
+ Response 200 (application/json)
    + Attributes (User)
        + xp: 69444 (number)
        + chests: 35 (number)
        + coins: 1195 (number)
        + rank: 1 (number)
    
+ Response 404 (application/json)
    + Attributes (NotFound)



## XP [/levels/xp/{userid}]
+ Parameters
    + userid: 180642647424106496 (string) - An unique identifier of the user provided by Discord


### Add XP to specified User [POST]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

    + Body
        
            {
                "xp" : 2
            }


+ Response 200 (application/json)
    + Attributes
        + action: add (string)
        + oldXP: 3 (number)
        + newXP: 5 (number)


### Remove XP from specified User [DELETE]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

    + Body
        
            {
                "xp" : 2
            }


+ Response 200 (application/json)
    + Attributes
        + action: remove (string)
        + oldXP: 5 (number)
        + newXP: 3 (number)
    


## Chests [/levels/chests/{userid}]
+ Parameters
    + userid: 180642647424106496 (string, required) - An unique identifier of the user provided by Discord


### Add Chests to specified User [POST]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

    + Body
        
            {
                "chests" : 2
            }


+ Response 200 (application/json)
    + Attributes
        + action: add (string)
        + oldChests: 3 (number)
        + newChests: 5 (number)
    
### Remove Chests from specified User [DELETE]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

    + Body
        
            {
                "chests" : 2
            }


+ Response 200 (application/json)
    + Attributes
        + action: remove (string)
        + oldChests: 5 (number)
        + newChests: 3 (number)
    

## Coins [/levels/coins/{userid}]
+ Parameters
    + userid: 180642647424106496 (string, required) - An unique identifier of the user provided by Discord


### Add Coins to specified User [POST]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

    + Body
        
            {
                "coins" : 2
            }


+ Response 200 (application/json)
    + Attributes
        + action: add (string)
        + oldCoins: 3 (number)
        + newCoins: 5 (number)
    
### Remove Coins from specified User [DELETE]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

    + Body
        
            {
                "coins" : 2
            }


+ Response 200 (application/json)
    + Attributes
        + action: remove (string)
        + oldCoins: 5 (number)
        + newCoins: 3 (number)



# Group TopDesign

## Data Structures

### Post (object)
+ username: Natro | derTomekk (string, required) - Discord Username
+ avatar: https://i.imgur.com/WziAVO9.png (string, required)
+ userid: 137227722660380670 (UserID, required)
+ image: https://i.imgur.com/nysMj7j.png (string, required) - User's Design uploaded on imgur.com


## Posts [/topdesign/posts]

### List All Posts [GET]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)
            
+ Response 200 (application/json)
    + Attributes (array)
        + (Post)
            + id: 142 (number, required) -  An unique identifier of the Post
            + likes: 15 (number, required)

### Add Post [POST]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

    + Body 
    
            {
                "username": "Natro | derTomekk",
                "avatar": "https://i.imgur.com/WziAVO9.png",
                "userid": 137227722660380670,
                "image": "https://i.imgur.com/nysMj7j.png",
                "content": "#topdesign"
            }


+ Response 200 (application/json)
    + Attributes (object)
        + action: add (string, required)
        + postid: 142 (number, required) -  An unique identifier of the Post



## Posts - Month [/topdesign/posts/month]

### List All Posts grouped by Month [GET]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

+ Response 200 (application/json)
    + Attributes (object)
        + 20179 (array)
            + (Post)
                + id: 142 (number, required) -  An unique identifier of the Post
                + likes: 15 (number, required)
        + 201710 (array)
            + (Post)
                + id: 142 (number, required) -  An unique identifier of the Post
                + likes: 15 (number, required)

## Posts - Current Month [/topdesign/posts/currentmonth]

### List All Posts from current Month [GET]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

+ Response 200 (application/json)
    + Attributes (array)
        + (Post)
            + id: 142 (number, required) -  An unique identifier of the Post
            + likes: 15 (number, required)




## Single Post [/topdesign/posts/{postid}]
+ Parameters
    + postid: 142 (number, required) -  An unique identifier of the Post

### List Post [GET]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

+ Response 200 (application/json)
    + Attributes (Post)
        + id: 142 (number, required) -  An unique identifier of the Post
        + likes: 15 (number, required)

+ Response 404 (application/json)
    + Attributes (NotFound)

### Delete Post [DELETE]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

+ Response 200 (application/json)
    + Attributes (object)
        + action: delete (string)

+ Response 404 (application/json)
    + Attributes (NotFound)

### Update Status of Post [PUT]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)


+ Response 200 (application/json)
    + Attributes (object)
        + action: deactivate, activate (string)
        + likes: 15 (number)
        + posted_by: Natro | derTomekk (string)

+ Response 404 (application/json)
    + Attributes (NotFound)


## Submissions [/topdesign/submissions/{userid}]
+ Parameters
    + userid: 180642647424106496 (string, required) - An unique identifier of the user provided by Discord

### List Submissions from specified User [GET]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

+ Response 200 (application/json)
    + Attributes (array)
        + (Post)
            + id: 142 (number, required) -  An unique identifier of the Post
            + likes: 15 (number, required)


## Votes [/topdesign/voted/{userid}]
+ Parameters
    + userid: 180642647424106496 (string, required) - An unique identifier of the user provided by Discord

### List Posts a specified User voted for [GET]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

+ Response 200 (application/json)
    + Attributes (array)
        + (Post)
            + id: 142 (number, required) -  An unique identifier of the Post
            + likes: 15 (number, required)


## Vote [/topdesign/vote/{postid}]
+ Parameters
    + postid: 142 (number, required) -  An unique identifier of the Post

### Vote for specified Post [GET]

+ Request (application/json)

    + Headers
    
            Token: (ApiKey)

+ Response 200 (application/json)
    + Attributes (object)
        + action: add (string)
        + likes: 16 (number)
        + posted_by: Natro | derTomekk (string)