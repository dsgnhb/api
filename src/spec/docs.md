FORMAT: 1A

# designhub API

REST API written in TypeScript using express and mysql


# Data Structures

## User (object)
+ userid: 180642647424106496 (number, required)  - An unique identifier of the user provided by Discord
+ username: Fin (string, required) - Discord Username
+ discriminator: 7929 (number, required) - Discord's Username Thing
+ avatar: https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png (string, required)

## Post (object)
+ username: Natro | derTomekk (string, required) - Discord Username
+ avatar: https://i.imgur.com/WziAVO9.png (string, required)
+ userid: 137227722660380670 (number, required)
+ image: https://i.imgur.com/nysMj7j.png (string, required) - User's Design uploaded on imgur.com

# Group Welcome
Resources related to donations in the API.

## General [/]

### Get Version [GET]

+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + version: "1.9.0" (string, required)

# Group Donation
Resources related to donations in the API.

## General [/donate]

### List All Donations [GET]

+ Request
    + Headers
    
            Token: TEST1


+ Response 200 (application/json; charset=utf-8)
    + Attributes (array)
        + (object)
            + id: 1 (number, required)
            + timestamp: 2017-09-16T17:06:50.000Z (string, required)
            + name: Donator (string)
            + ip: 84.164.60.45 (string, required)
            + code: XXXX-XXXX-XXXX-XXXX (string, required)

### Create a New Donation [POST]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
        
            {
                "name" : "lukas",
                "ip": "127.0.0.1",
                "code" : "0000-0000-0000-0000"
            }


+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + action: add (string, required)
        




# Group Levels
Resources related to levels in the API.


## General [/levels]

### List All Levels Data [GET]

+ Request
    + Headers
    
            Token: TEST1

+ Response 200 (application/json; charset=utf-8)
    + Attributes (array)
        + (User)
            + xp: 69444 (number, required)
            + chests: 35 (number, required)
            + coins: 1195 (number, required)
            + rank: 1 (number, required)



## User [/levels/{userid}]
+ Parameters
    + userid: 180642647424106496 (number) - An unique identifier of the user provided by Discord


### List Levels Data from specified User [GET]

+ Request
    + Headers
    
            Token: TEST1
            
+ Response 200 (application/json; charset=utf-8)
    + Attributes (User)
        + xp: 69444 (number, required)
        + chests: 35 (number, required)
        + coins: 1195 (number, required)
        + rank: 1 (number, required)
    
+ Response 404 (application/json; charset=utf-8)
    
    + Body

            {
                "error": "Not found"
            }

## XP [/levels/xp/{userid}]
+ Parameters
    + userid: 180642647424106496 (number, required) - An unique identifier of the user provided by Discord


### Add XP to specified User [POST]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
        
            {
                "username": "Fin",
                "discriminator": 7929,
                "avatar": "https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png",
                "xp": 3573
            }


+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + action: add (string, required)
        + oldXP: 3 (number, required)
        + newXP: 5 (number, required)


### Remove XP from specified User [DELETE]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
        
            {
                "username": "Fin",
                "discriminator": 7929,
                "avatar": "https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png",
                "xp": 3573
            }


+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + action: remove (string, required)
        + oldXP: 5 (number, required)
        + newXP: 3 (number, required)
    
## Chests [/levels/chests/{userid}]
+ Parameters
    + userid: 180642647424106496 (number, required) - An unique identifier of the user provided by Discord


### Add Chests to specified User [POST]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
        
            {
                "username": "Fin",
                "discriminator": 7929,
                "avatar": "https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png",
                "chests": 2
            }


+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + action: add (string, required)
        + oldChests: 3 (number, required)
        + newChests: 5 (number, required)
    
### Remove Chests from specified User [DELETE]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
        
            {
                "username": "Fin",
                "discriminator": 7929,
                "avatar": "https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png",
                "chests": 2
            }


+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + action: remove (string, required)
        + oldChests: 5 (number, required)
        + newChests: 3 (number, required)
    

## Coins [/levels/coins/{userid}]
+ Parameters
    + userid: 180642647424106496 (number, required) - An unique identifier of the user provided by Discord


### Add Coins to specified User [POST]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
        
            {
                "username": "Fin",
                "discriminator": 7929,
                "avatar": "https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png",
                "coins": 100
            }


+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + action: add (string, required)
        + oldCoins: 3 (number, required)
        + newCoins: 5 (number, required)
    
### Remove Coins from specified User [DELETE]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
        
            {
                "username": "Fin",
                "discriminator": 7929,
                "avatar": "https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png",
                "coins": 100
            }


+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + action: remove (string, required)
        + oldCoins: 5 (number, required)
        + newCoins: 3 (number, required)




# Group Top Design
Resources related to donations in the API.

## Posts [/topdesign/posts]

### List All Posts [GET]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1
            
+ Response 200 (application/json; charset=utf-8)
    + Attributes (array)
        + (Post)
            + id: 142 (number, required) -  An unique identifier of the Post
            + likes: 15 (number, required)
### Add Post [POST]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body 
    
            {
                "username": "Natro | derTomekk",
                "avatar": "https://i.imgur.com/WziAVO9.png",
                "userid": 137227722660380670,
                "image": "https://i.imgur.com/nysMj7j.png",
                "content": "#topdesign"
            }


+ Response 200 (application/json; charset=utf-8)
    + Attributes (object)
        + action: add (string, required)
        + postid: 142 (number, required) -  An unique identifier of the Post


## Posts - Month [/topdesign/posts/month]

### List All Posts grouped by Month [GET]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

+ Response 200 (application/json; charset=utf-8)
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


+ Response 200 (application/json; charset=utf-8)
    + Attributes (array)
        + (Post)
            + id: 142 (number, required) -  An unique identifier of the Post
            + likes: 15 (number, required)


## Single Post [/topdesign/posts/{postid}]
+ Parameters
    + postid: 1 (number, required) -  An unique identifier of the Post

### List Post [GET]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

+ Response 200 (application/json; charset=utf-8)
    + Attributes (Post)
        + id: 44 (number, required) -  An unique identifier of the Post
        + likes: 15 (number, required)
        + timeshort: 20182 (number, required)
        + active: 1 (number, required)

+ Response 404 (application/json; charset=utf-8)
    
    + Body

            {
                "error": "Not found"
            }


### Update Status of Post [PUT]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1


+ Response 200 (application/json; charset=utf-8)
    + Attributes (object)
        + action: deactivate (string, required)
        + likes: 15 (number, required)
        + posted_by: Natro | derTomekk (string, required)

+ Response 404 (application/json; charset=utf-8)
    
    + Body

            {
                "error": "Not found"
            }
    
### Delete Post [DELETE]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

+ Response 200 (application/json; charset=utf-8)
    + Attributes (object)
        + action: delete (string, required)

+ Response 404 (application/json; charset=utf-8)
    
    + Body
    
            {
                "error": "Not found"
            }



## Submissions [/topdesign/submissions/{userid}]
+ Parameters
    + userid: 229496324444127233 (string, required) - An unique identifier of the user provided by Discord

### List Submissions from specified User [GET]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

+ Response 200 (application/json; charset=utf-8)
    + Attributes (object)
        + 20178 (array)
            + (Post)
                + id: 142 (number, required) -  An unique identifier of the Post
                + likes: 15 (number, required)

+ Response 404 (application/json; charset=utf-8)
    
    + Body
    
            {
                "error": "Not found"
            }


## Votes [/topdesign/voted/{userid}]
+ Parameters
    + userid: 180642647424106496 (string, required) - An unique identifier of the user provided by Discord

### List Posts a specified User voted for [GET]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

+ Response 200 (application/json; charset=utf-8)
    + Attributes (object)
        + 20178 (array)
            + (object)
                + id: 142 (number, required) -  An unique identifier of the Post
                + timeshort: 20178

## Vote [/topdesign/vote/{postid}]
+ Parameters
    + postid: 3 (number, required) -  An unique identifier of the Post

### Vote for specified Post [POST]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
    
            {
                "userid": 180642647424106496
            }

+ Response 200 (application/json; charset=utf-8)
    + Attributes (object)
        + action: add (string)
        + likes: 16 (number)
        + posted_by: Natro | derTomekk (string)

+ Response 404 (application/json; charset=utf-8)
    
    + Body
    
            {
                "error": "Not found"
            }


# Group Image processing
Resources related to donations in the API.

## Request Image [/post]

### Request Image for Social Media Post [POST]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1

    + Body
    
            {
                "header1": "header1",
                "header2": "header2",
                "content": "content",
                "bgimg": "https://i.imgur.com/8TzoYr9.png"
            }
            
+ Response 200 (img/png)

## Internal Rendering [/post_b]

## Internal Route for Post rendering [GET]

+ Request (application/json; charset=utf-8)

    + Headers
    
            Token: TEST1
            
+ Response 403 (application/json; charset=utf-8)
    
    + Body
    
            {
                "error": "Forbidden"
            }
